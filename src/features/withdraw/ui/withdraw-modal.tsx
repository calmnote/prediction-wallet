"use client";

import * as React from "react";
import { isAddress } from "viem";

import { withdraw } from "@/actions/withdraw";
import { getTxStatus } from "@/actions/get-tx-status";

import { Button } from "@/shared/ui/button";
import { Text } from "@/shared/ui/typography/text";
import { useEffect, useState } from "react";
import { useWalletStore } from "@/entities/wallet/model/wallet.store";
import { sanitizeAmountInput } from "@/shared/lib/sanitizeAmountInput";

type TxStatus =
  | "idle"
  | "signing"
  | "pending"
  | "success"
  | "reverted"
  | "error";

export const WithdrawModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const userBalance = useWalletStore((s) => s.balance);
  const applyWithdraw = useWalletStore((s) => s.applyWithdraw);

  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [hash, setHash] = useState<`0x${string}` | null>(null);
  const [status, setStatus] = useState<TxStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const amountNum = Number(amount);

  useEffect(() => {
    if (!open || !hash || status !== "pending") return;

    let cancelled = false;

    const id = setInterval(async () => {
      try {
        const st = await getTxStatus(hash);
        if (cancelled) return;
        if (st.status === "pending") return;

        setStatus(st.status);

        if (st.status === "success") {
          applyWithdraw(amountNum);
        }
        clearInterval(id);
      } catch {}
    }, 4000);

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [open, hash, status, applyWithdraw, amountNum]);

  function getErrorMessage(err: unknown) {
    return err instanceof Error ? err.message : "withdraw failed";
  }

  const onSubmit = async () => {
    setError(null);

    if (!isAddress(to)) return setError("Invalid recipient address");
    if (!amount || !Number.isFinite(amountNum) || amountNum <= 0)
      return setError("Amount must be greater than 0");
    if (amountNum >= userBalance)
      return setError("Amount exceeds your balance");

    setStatus("signing");

    try {
      const res = await withdraw({ to, amount: String(amountNum) });
      setHash(res.hash);
      setStatus("pending");
    } catch (err: unknown) {
      setStatus("error");
      setError(getErrorMessage(err));
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
        aria-label="Close"
      />

      <div className="relative w-full max-w-[420px] rounded-xl bg-white border border-secondary-border p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <Text size="base" className="font-medium">
            Withdraw
          </Text>
          <Button onClick={onClose}>Close</Button>
        </div>

        <div className="mt-4 space-y-3">
          <div>
            <Text size="sm" tone="secondary">
              Recipient
            </Text>
            <input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="0x..."
              className="mt-1 w-full rounded-lg border border-secondary-border bg-white px-3 py-2 text-sm outline-none focus:border-black/20"
            />
          </div>

          <div>
            <Text size="sm" tone="secondary">
              Amount
            </Text>
            <input
              value={amount}
              onChange={(e) => {
                setAmount(sanitizeAmountInput(e.target.value));
              }}
              placeholder="0.00"
              inputMode="decimal"
              className="mt-1 w-full rounded-lg border border-secondary-border bg-white px-3 py-2 text-sm outline-none focus:border-black/20"
            />
          </div>

          {error ? (
            <Text size="sm" tone="negative" className="mt-1">
              {error}
            </Text>
          ) : null}

          <Button
            variant="primary"
            className="h-11 w-full text-base font-medium"
            onClick={onSubmit}
            disabled={status === "signing" || status === "pending"}
          >
            {status === "signing"
              ? "Submitting…"
              : status === "pending"
                ? "Pending…"
                : "Withdraw"}
          </Button>

          {status !== "idle" && (
            <Text size="xs" tone="secondary">
              Status:{" "}
              {status === "signing"
                ? "Submitting…"
                : status === "pending"
                  ? "Pending"
                  : status === "success"
                    ? "Confirmed"
                    : status === "reverted"
                      ? "Failed"
                      : "Error"}
            </Text>
          )}

          {hash ? (
            <div className="rounded-lg border border-secondary-border bg-primary px-3 py-2">
              <Text size="xs" tone="secondary">
                Tx hash
              </Text>
              <Text size="sm" className="font-medium break-all">
                {hash}
              </Text>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
