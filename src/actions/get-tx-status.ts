"use server";

import { publicClient } from "@/shared/lib/evm/veim";

export async function getTxStatus(hash: `0x${string}`) {
  try {
    const receipt = await publicClient.getTransactionReceipt({ hash });
    return {
      status: receipt.status,
      blockNumber: receipt.blockNumber,
    };
  } catch {
    return { status: "pending" as const };
  }
}
