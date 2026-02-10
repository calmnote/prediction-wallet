import "server-only";

import { z } from "zod";

const envSchema = z.object({
  ETH_RPC_URL: z.string().url(),
  ETHERSCAN_API_KEY: z.string().min(1),

  WALLET_PRIVATE_KEY: z
    .string()
    .min(1)
    .transform((v) => (v.startsWith("0x") ? v : `0x${v}`) as `0x${string}`)
    .refine((v) => /^0x[0-9a-fA-F]{64}$/.test(v), "Invalid private key format"),

  PUBLIC_KEY: z
    .string()
    .min(1)
    .refine((v) => /^0x[0-9a-fA-F]{40}$/.test(v), "Invalid PUBLIC_KEY value"),

  TOKEN_ADDRESS: z
    .string()
    .min(1)
    .refine(
      (v) => /^0x[0-9a-fA-F]{40}$/.test(v),
      "Invalid TOKEN_ADDRESS value",
    ),

  TOKEN_DECIMALS: z.coerce.number().int().min(0).max(36).default(6),

  DEPOSIT_TARGET: z
    .string()
    .min(1)
    .refine(
      (v) => /^0x[0-9a-fA-F]{40}$/.test(v),
      "Invalid DEPOSIT_TARGET value",
    ),

  CHAIN_ID: z.coerce.string().default("1"),
});

export type Env = z.infer<typeof envSchema>;

function formatZodError(err: z.ZodError) {
  return err.issues
    .map((i) => `- ${i.path.join(".") || "(root)"}: ${i.message}`)
    .join("\n");
}

export const env: Env = (() => {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    throw new Error(
      `Invalid environment variables:\n${formatZodError(parsed.error)}`,
    );
  }

  return parsed.data;
})();
