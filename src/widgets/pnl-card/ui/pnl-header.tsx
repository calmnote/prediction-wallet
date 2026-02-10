"use client";

import { Text } from "@/shared/ui/typography/text";
import { ArrowIcon, ShareIcon } from "@/shared/ui/icons";
import { PnlTabs, type PnlRange } from "./pnl-tabs";
import clsx from "clsx";
import { motion } from "framer-motion";
import { pressable } from "@/shared/lib/motion";

type PnlHeaderProps = {
  range: PnlRange;
  onRangeChange: (v: PnlRange) => void;
  isPositive: boolean;
};

export const PnlHeader = ({
  range,
  onRangeChange,
  isPositive,
}: PnlHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <ArrowIcon
          className={clsx(
            isPositive ? "text-red-500 rotate-180" : "text-positive",
            "h-4 w-4 transition-all",
          )}
        />
        <Text size="sm" tone="secondary" className="tracking-[-0.28px]">
          Profit/Loss
        </Text>

        <motion.button
          type="button"
          className="ml-1 text-secondary cursor-pointer"
          {...pressable}
        >
          <ShareIcon className="h-4 w-4" />
        </motion.button>
      </div>

      <PnlTabs value={range} onChange={onRangeChange} />
    </div>
  );
};
