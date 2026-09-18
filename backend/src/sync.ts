import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { json, parseJsonBody, ddb, PAO_RULES, cabinetReport } from "./common";
import type { CabinetItem } from "../../shared/src/types";

interface PutBody {
  householdId: string;
  items: CabinetItem[];
}

export const handler = async (event: {
  httpMethod?: string;
  queryStringParameters?: Record<string, string> | null;
  body?: string | null;
  isBase64Encoded?: boolean;
  requestContext?: { http?: { method?: string } };
}): Promise<{ statusCode: number; headers: Record<string, string>; body: string }> => {
  const method = event.requestContext?.http?.method ?? event.httpMethod ?? "GET";
  const table = process.env.TABLE_NAME ?? "medishelf-cabinet";

  try {
    if (method === "POST") {
      const body = parseJsonBody<PutBody>(event);
      if (!body.householdId) return json(400, { ok: false, error: "householdId required" });

      // server-side recompute — the daily cron uses the same engine
      const report = cabinetReport(body.items ?? [], PAO_RULES);

      await ddb.send(
        new PutCommand({
          TableName: table,
          Item: {
            householdId: body.householdId,
            items: body.items ?? [],
            updatedAt: new Date().toISOString(),
            flagCount: report.expiryFlags.length,
            stackCount: report.stacks.length,
          },
        })
      );
      return json(200, { ok: true });
    }

    const id = event.queryStringParameters?.id;
    if (!id) return json(400, { ok: false, error: "id query param required" });
    const res = await ddb.send(new GetCommand({ TableName: table, Key: { householdId: id } }));
    return json(200, { ok: true, item: res.Item ?? null });
  } catch (e) {
    console.error(e);
    return json(500, { ok: false, error: (e as Error).message });
  }
};
