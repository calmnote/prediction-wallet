"use server";

import { z } from "zod";
import { isAddress } from "viem";

import { env } from "@/shared/config/env";
import { erc20Abi } from "@/shared/lib/evm/erc20";
import { toUnits } from "@/shared/lib/evm/amount";
import { account, publicClient, walletClient } from "@/shared/lib/evm/veim";

const WithdrawSchema = z.object({
  to: z.string().refine((v) => isAddress(v), "Invalid address"),
  amount: z.string().min(1, "Amount is required"),
});

export async function withdraw(params: { to: string; amount: string }) {
  const { to, amount } = WithdrawSchema.parse(params);

  const value = toUnits(amount, env.TOKEN_DECIMALS);

  const { request } = await publicClient.simulateContract({
    account,
    address: env.TOKEN_ADDRESS,
    abi: erc20Abi,
    functionName: "transfer",
    args: [to as `0x${string}`, value],
  });

  const hash = await walletClient.writeContract(request);
  return { hash };
}
