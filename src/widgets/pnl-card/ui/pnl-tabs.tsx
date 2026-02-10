"use client";

import clsx from "clsx";
import { pressable } from "@/shared/lib/motion";
import { motion } from "framer-motion";

export type PnlRange = "1h" | "6h" | "1d" | "1w" | "1m" | "all";

const items: { value: PnlRange; label: string }[] = [
  { value: "1h", label: "1H" },
  { value: "6h", label: "6H" },
  { value: "1d", label: "1D" },
  { value: "1w", label: "1W" },
  { value: "1m", label: "1M" },
  { value: "all", label: "All" },
];

type PnlTabsProps = {
  value: PnlRange;
  onChange: (v: PnlRange) => void;
};

export const PnlTabs = ({ value, onChange }: PnlTabsProps) => {
  return (
    <div className="flex items-center gap-2">
      {items.map((it) => {
        const active = it.value === value;
        return (
          <motion.button
            key={it.value}
            type="button"
            onClick={() => onChange(it.value)}
            {...pressable}
            className={clsx(
              "px-3 h-6 rounded-full text-xs tracking-[-0.28px] transition cursor-pointer",
              active
                ? "bg-brand-orange/10 text-brand-orange"
                : "text-secondary hover:bg-black/5",
            )}
          >
            {it.label}
          </motion.button>
        );
      })}
    </div>
  );
};
