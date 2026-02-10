"use server";

import { env } from "@/shared/config/env";
import { erc20Abi } from "@/shared/lib/erc20";
import { toUnits } from "@/shared/lib/amount";
import { walletClient } from "@/shared/lib/veim";

export async function withdraw(params: { to: string; amount: string }) {
  const to = params.to as `0x${string}`;
  const value = toUnits(params.amount, env.TOKEN_DECIMALS);

  const hash = await walletClient.writeContract({
    address: env.TOKEN_ADDRESS as `0x${string}`,
    abi: erc20Abi,
    functionName: "transfer",
    args: [to, value],
  });

  return { hash };
}
