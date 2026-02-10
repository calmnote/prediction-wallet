import "server-only";

import { parseUnits } from "viem";

export function toUnits(amount: string, decimals: number): bigint {
  return parseUnits(amount, decimals);
}
