import "server-only";

import { env } from "@/shared/config/env";

export async function etherscanFetch(params: Record<string, string>) {
  const url = new URL(env.ETH_API_URL);
  Object.entries({ ...params, apikey: env.ETHERSCAN_API_KEY }).forEach(
    ([k, v]) => url.searchParams.set(k, v),
  );

  const res = await fetch(url.toString(), {
    method: "GET",
  });

  if (!res.ok) throw new Error(`etherscan HTTP ${res.status}`);

  const data = (await res.json()) as {
    status: string;
    message: string;
    result: any;
  };

  return data;
}

export async function getTokenBalance(params: {
  address: string;
  tokenAddress: string;
}) {
  const data = await etherscanFetch({
    module: "account",
    action: "tokenbalance",
    chainId: env.CHAIN_ID,
    address: params.address,
    contractaddress: params.tokenAddress,
    tag: "latest",
  });

  if (typeof data.result !== "string") {
    throw new Error(`Unexpected etherscan response: ${JSON.stringify(data)}`);
  }

  return data.result;
}
