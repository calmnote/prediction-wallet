"use server";

import { env } from "@/shared/config/env";
import { getErc20Balance } from "@/shared/lib/etherscan";

export async function getWalletSummary(publicKey?: string) {
  const address = (publicKey ?? env.PUBLIC_KEY).toLowerCase();

  const raw = await getErc20Balance({
    address,
    tokenAddress: env.TOKEN_ADDRESS,
  });

  return {
    address,
    tokenAddress: env.TOKEN_ADDRESS,
    decimals: env.TOKEN_DECIMALS,
    rawBalance: raw,
  };
}
