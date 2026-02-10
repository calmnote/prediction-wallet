import "server-only";

import { createPublicClient, createWalletClient, http } from "viem";
import { mainnet, sepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { env } from "@/shared/config/env";

const chain = env.CHAIN_ID === "11155111" ? sepolia : mainnet;

export const publicClient = createPublicClient({
  chain,
  transport: http(env.ETH_RPC_URL),
});

export const account = privateKeyToAccount(env.WALLET_PRIVATE_KEY);

export const walletClient = createWalletClient({
  chain,
  transport: http(env.ETH_RPC_URL),
  account,
});
