"use server";

import { env } from "@/shared/config/env";

export async function getDepositInfo() {
  return {
    address: env.PUBLIC_KEY,
    tokenAddress: env.TOKEN_ADDRESS,
    decimals: env.TOKEN_DECIMALS,
  };
}
