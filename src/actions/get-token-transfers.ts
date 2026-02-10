"use server";

import { env } from "@/shared/config/env";
import { etherscanFetch } from "@/shared/lib/etherscan/etherscan";

export type EtherscanTokentxItem = {
  timeStamp: string;
  from: string;
  to: string;
  value: string;
  tokenDecimal: string;
};

export async function getTokenTransfers(params: {
  address: string;
  tokenAddress: string;
  page?: number;
  offset?: number;
}) {
  const data = await etherscanFetch({
    module: "account",
    action: "tokentx",
    chainid: String(env.CHAIN_ID),
    address: params.address,
    contractaddress: params.tokenAddress,
    page: String(params.page ?? 1),
    offset: String(params.offset ?? 200),
    sort: "desc",
  });

  if (data.status !== "1" && data.message !== "No transactions found") {
    throw new Error(String(data.result ?? "Etherscan error"));
  }

  return (data.result ?? []) as EtherscanTokentxItem[];
}
