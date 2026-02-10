import { env } from "@/shared/config/env";
import { etherscanFetch } from "@/shared/lib/etherscan/etherscan";

type EtherscanTokentxItem = {
  hash: string;
  timeStamp: string;
  from: string;
  to: string;
  value: string;
};

type EtherscanResponse<T> = {
  status: "0" | "1";
  message: string;
  result: T;
};

export async function getErc20Transfers(params: {
  address: string;
  tokenAddress: string;
  page?: number;
  offset?: number;
}) {
  const data = (await etherscanFetch({
    module: "account",
    action: "tokentx",
    chainId: env.CHAIN_ID,
    address: params.address,
    contractaddress: params.tokenAddress,
    page: String(params.page ?? 1),
    offset: String(params.offset ?? 20),
    sort: "desc",
  })) as EtherscanResponse<EtherscanTokentxItem[] | string>;

  if (data.status !== "1" && data.message !== "no transactions found") {
    const err =
      typeof data.result === "string"
        ? data.result
        : JSON.stringify(data.result);
    throw new Error(err || "etherscan error");
  }

  return (
    Array.isArray(data.result) ? data.result : []
  ) as EtherscanTokentxItem[];
}
