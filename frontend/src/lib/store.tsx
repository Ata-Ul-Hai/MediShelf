"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { cabinetReport, itemFromDrug, PAO_RULES } from "@medishelf/shared";
import type { CabinetItem, DrugEntry } from "@medishelf/shared";
import { dbDelete, dbGetAll, dbPut, metaGet, metaSet } from "./db";
import { apiSyncCabinet } from "./api";

export type Lang = "en" | "hi";

interface Store {
  ready: boolean;
  items: CabinetItem[];
  report: ReturnType<typeof cabinetReport>;
  lang: Lang;
  setLang: (l: Lang) => void;
  addDrug: (drug: DrugEntry, overrides?: Partial<CabinetItem>) => CabinetItem;
  addRaw: (item: Omit<CabinetItem, "addedOn">) => CabinetItem;
  addMany: (newItems: CabinetItem[]) => void;
  updateItem: (item: CabinetItem) => void;
  removeItem: (id: string) => void;
  itemById: (id: string) => CabinetItem | undefined;
}

const Ctx = createContext<Store | null>(null);

const HOUSEHOLD_KEY = "medishelf-demo"; // single-household demo (Cognito = production step)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [items, setItems] = useState<CabinetItem[]>([]);
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    (async () => {
      try {
        const [stored, savedLang] = await Promise.all([
          dbGetAll<CabinetItem>(),
          metaGet<Lang>("lang"),
        ]);
        setItems(stored.sort((a, b) => a.brand.localeCompare(b.brand)));
        if (savedLang) setLangState(savedLang);
      } finally {
        setReady(true);
      }
    })();
  }, []);

  const persist = useCallback((next: CabinetItem[]) => {
    setItems(next);
    // best-effort cloud sync (skips silently when offline)
    void apiSyncCabinet(HOUSEHOLD_KEY, next);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    void metaSet("lang", l);
  }, []);

  const addDrug = useCallback(
    (drug: DrugEntry, overrides: Partial<CabinetItem> = {}) => {
      const item = itemFromDrug(drug, overrides);
      const next = [...items, item].sort((a, b) => a.brand.localeCompare(b.brand));
      persist(next);
      void dbPut(item);
      return item;
    },
    [items, persist]
  );

  const addRaw = useCallback(
    (partial: Omit<CabinetItem, "addedOn">) => {
      const item: CabinetItem = { ...partial, addedOn: new Date().toISOString().slice(0, 10) };
      const next = [...items, item].sort((a, b) => a.brand.localeCompare(b.brand));
      persist(next);
      void dbPut(item);
      return item;
    },
    [items, persist]
  );

  /** Batch add (single state update — avoids stale-closure loops). */
  const addMany = useCallback(
    (newItems: CabinetItem[]) => {
      const next = [...items, ...newItems].sort((a, b) => a.brand.localeCompare(b.brand));
      persist(next);
      for (const item of newItems) void dbPut(item);
    },
    [items, persist]
  );

  const updateItem = useCallback(
    (item: CabinetItem) => {
      const next = items.map((i) => (i.id === item.id ? item : i));
      persist(next);
      void dbPut(item);
    },
    [items, persist]
  );

  const removeItem = useCallback(
    (id: string) => {
      persist(items.filter((i) => i.id !== id));
      void dbDelete(id);
    },
    [items, persist]
  );

  const report = useMemo(() => cabinetReport(items, PAO_RULES), [items]);
  const itemById = useCallback((id: string) => items.find((i) => i.id === id), [items]);

  const value: Store = {
    ready,
    items,
    report,
    lang,
    setLang,
    addDrug,
    addRaw,
    addMany,
    updateItem,
    removeItem,
    itemById,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore(): Store {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStore outside StoreProvider");
  return v;
}
