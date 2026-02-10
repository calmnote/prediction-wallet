"use server";

import { env } from "@/shared/config/env";
import { erc20Abi } from "@/shared/lib/erc20";
import { toUnits } from "@/shared/lib/amount";
import { walletClient } from "@/shared/lib/veim";

export async function deposit(amount: string) {
  const value = toUnits(amount, env.TOKEN_DECIMALS);

  const hash = await walletClient.writeContract({
    address: env.TOKEN_ADDRESS as `0x${string}`,
    abi: erc20Abi,
    functionName: "transfer",
    args: [env.DEPOSIT_TARGET as `0x${string}`, value],
  });

  return { hash };
}
