"use server";

import { env } from "@/shared/config/env";
import { getTokenBalance } from "@/shared/lib/etherscan/etherscan";

interface WalletSummary {
  address: string;
  tokenAddress: string;
  decimals: number;
  rawBalance: string;
}

export async function getWalletSummary(
  publicKey?: string,
): Promise<WalletSummary> {
  const address = (publicKey ?? env.PUBLIC_KEY).toLowerCase();

  const raw = await getTokenBalance({
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
