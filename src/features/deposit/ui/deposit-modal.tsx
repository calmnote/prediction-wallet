"use client";

import * as React from "react";
import { getDepositInfo } from "@/actions/get-deposit-info";
import { checkDeposits } from "@/actions/check-deposits";
import { formatUnits } from "viem";

import { Button } from "@/shared/ui/button";
import { Text } from "@/shared/ui/typography/text";
import { useEffect, useRef, useState } from "react";
import { useWalletStore } from "@/entities/wallet/model/wallet.store";

type DepositTx = {
  hash: `0x${string}`;
  ts: number;
  from: string;
  to: string;
  rawValue: string;
};

function shortHash(h: string) {
  return `${h.slice(0, 6)}…${h.slice(-4)}`;
}

export const DepositModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [address, setAddress] = useState<string>("");
  const [decimals, setDecimals] = useState<number>(6);
  const [txs, setTxs] = useState<DepositTx[]>([]);
  const applyDeposit = useWalletStore((s) => s.applyDeposit);
  const seenRef = useRef<Set<string>>(new Set());
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!open) return;

    initializedRef.current = false;
    seenRef.current = new Set();

    let alive = true;
    let timer: ReturnType<typeof setInterval> | null = null;

    const loadOnce = async () => {
      const info = await getDepositInfo();
      if (!alive) return;
      setAddress(info.address);
      setDecimals(info.decimals);
    };

    const loadTxs = async () => {
      try {
        const list = await checkDeposits();
        if (!alive) return;

        if (!initializedRef.current) {
          initializedRef.current = true;
          seenRef.current = new Set(list.map((t) => t.hash.toLowerCase()));
          setTxs(list);
          return;
        }

        const prevSeen = seenRef.current;

        const newOnes = list.filter((t) => !prevSeen.has(t.hash.toLowerCase()));

        if (newOnes.length) {
          const delta = newOnes.reduce((sum, t) => {
            const amount = Number(formatUnits(BigInt(t.rawValue), decimals));
            return sum + amount;
          }, 0);

          if (delta > 0) applyDeposit(delta);

          for (const t of newOnes) prevSeen.add(t.hash.toLowerCase());
        }

        setTxs(list);
      } catch (e) {
        console.error(e);
      }
    };

    (async () => {
      await loadOnce();
      await loadTxs();

      timer = setInterval(loadTxs, 6000);
    })();

    return () => {
      alive = false;
      if (timer) clearInterval(timer);
    };
  }, [open]);

  const copy = async () => {
    if (!address) return;
    await navigator.clipboard.writeText(address);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
        aria-label="Close"
      />

      <div className="relative w-full max-w-105 rounded-xl bg-white border border-secondary-border p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <Text size="base" className="font-medium">
            Deposit
          </Text>
          <Button onClick={onClose}>Close</Button>
        </div>

        <div className="mt-4">
          <Text size="sm" tone="secondary">
            Send tokens to this address
          </Text>

          <div className="mt-2 flex items-center justify-between gap-2 rounded-lg border border-secondary-border bg-primary px-3 py-2">
            <Text size="sm" className="font-medium break-all">
              {address || "—"}
            </Text>

            <Button variant="secondary" className="h-9 px-3" onClick={copy}>
              Copy
            </Button>
          </div>

          <div className="mt-4">
            <Text size="sm" tone="secondary">
              Recent deposits
            </Text>

            <div className="mt-2 space-y-2">
              {txs.slice(0, 5).map((t) => (
                <div
                  key={t.hash}
                  className="flex items-center justify-between rounded-lg border border-secondary-border px-3 py-2"
                >
                  <div>
                    <Text size="sm" className="font-medium">
                      {shortHash(t.hash)}
                    </Text>
                    <Text size="xs" tone="secondary">
                      {new Date(t.ts).toLocaleString("en-US")}
                    </Text>
                  </div>

                  <Text size="sm" className="font-medium">
                    {formatUnits(BigInt(t.rawValue), decimals)}
                  </Text>
                </div>
              ))}

              {!txs.length ? (
                <Text size="sm" tone="secondary" className="mt-2">
                  No deposits yet.
                </Text>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
