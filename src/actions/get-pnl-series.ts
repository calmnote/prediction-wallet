"use server";

import { unstable_cache } from "next/cache";
import { formatUnits } from "viem";
import { env } from "@/shared/config/env";
import { getTokenTransfers } from "./get-token-transfers";
import { buildPnlSeries } from "@/shared/lib/pnl/buildSeries";
import { PnlRange } from "@/shared/lib/pnl/types";

export async function getPnlSeries(range: PnlRange) {
  const address = env.PUBLIC_KEY.toLowerCase();

  return unstable_cache(
    async () => {
      const txs = await getTokenTransfers({
        address,
        tokenAddress: env.TOKEN_ADDRESS,
        offset: 200,
      });

      const flows = txs
        .map((t) => {
          const from = t.from.toLowerCase();
          const to = t.to.toLowerCase();
          const dir = to === address ? "in" : from === address ? "out" : null;
          if (!dir) return null;

          const amount = Number(
            formatUnits(BigInt(t.value), Number(t.tokenDecimal)),
          );
          return { ts: Number(t.timeStamp) * 1000, dir, amount };
        })
        .filter(Boolean) as { ts: number; dir: "in" | "out"; amount: number }[];

      return buildPnlSeries(flows, range);
    },
    ["pnl-series", address, range],
    { revalidate: 60 },
  )();
}
