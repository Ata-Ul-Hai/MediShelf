// Daily EventBridge sweep: recompute every household's safety report server-side
// so the PWA can show "checked at 06:00 IST, 3 alerts" even before it recomputes
// locally. Demonstrates EventBridge + Lambda + DynamoDB with the shared engine.
import { ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { ddb, PAO_RULES, cabinetReport } from "./common";
import type { CabinetItem } from "../../shared/src/types";

export const handler = async (): Promise<void> => {
  const table = process.env.TABLE_NAME ?? "medishelf-cabinet";
  let exclusiveStartKey: Record<string, unknown> | undefined;

  do {
    const page = await ddb.send(new ScanCommand({ TableName: table, ExclusiveStartKey: exclusiveStartKey }));
    for (const row of page.Items ?? []) {
      const items = (row.items ?? []) as CabinetItem[];
      const report = cabinetReport(items, PAO_RULES);
      await ddb.send(
        new UpdateCommand({
          TableName: table,
          Key: { householdId: row.householdId },
          UpdateExpression: "SET lastSweep = :t, flagCount = :f, stackCount = :s, lastReport = :r",
          ExpressionAttributeValues: {
            ":t": new Date().toISOString(),
            ":f": report.expiryFlags.length,
            ":s": report.stacks.length,
            ":r": report,
          },
        })
      );
    }
    exclusiveStartKey = page.LastEvaluatedKey as Record<string, unknown> | undefined;
  } while (exclusiveStartKey);
};
