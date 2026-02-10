"use server";

import { env } from "@/shared/config/env";
import { getErc20Transfers } from "@/shared/lib/etherscan/get-erc20-transfers";

export async function checkDeposits(publicKey?: string) {
  const address = (publicKey ?? env.PUBLIC_KEY).toLowerCase();

  const txs = await getErc20Transfers({
    address,
    tokenAddress: env.TOKEN_ADDRESS,
    page: 1,
    offset: 20,
  });

  return txs
    .filter((t) => t.to.toLowerCase() === address)
    .map((t) => ({
      hash: t.hash as `0x${string}`,
      ts: Number(t.timeStamp) * 1000,
      from: t.from,
      to: t.to,
      rawValue: t.value,
    }));
}
