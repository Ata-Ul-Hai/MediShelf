"use client";

// Dependency-free IndexedDB wrapper for the offline cabinet.
const DB_NAME = "medishelf";
const STORE = "cabinet";
const META = "meta";

export function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: "id" });
      if (!db.objectStoreNames.contains(META)) db.createObjectStore(META);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function tx<T>(store: string, mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await openDb();
  return new Promise<T>((resolve, reject) => {
    const t = db.transaction(store, mode);
    const req = fn(t.objectStore(store));
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function dbGetAll<T>(store = STORE): Promise<T[]> {
  return tx<T[]>(store, "readonly", (s) => s.getAll() as IDBRequest<T[]>);
}

export async function dbPut<T extends { id?: string }>(value: T, store = STORE): Promise<void> {
  await tx(store, "readwrite", (s) => s.put(value) as IDBRequest<IDBValidKey>);
}

export async function dbDelete(id: string, store = STORE): Promise<void> {
  await tx(store, "readwrite", (s) => s.delete(id) as unknown as IDBRequest<undefined>);
}

export async function metaGet<T>(key: string): Promise<T | undefined> {
  return tx<T | undefined>(META, "readonly", (s) => s.get(key) as IDBRequest<T | undefined>);
}

export async function metaSet(key: string, value: unknown): Promise<void> {
  await tx(META, "readwrite", (s) => s.put(value, key) as IDBRequest<IDBValidKey>);
}
