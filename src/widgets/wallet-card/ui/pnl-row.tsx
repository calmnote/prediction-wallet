"use client";

import clsx from "clsx";
import { ArrowIcon } from "@/shared/ui/icons";
import { Text } from "@/shared/ui/typography/text";

type PnlRowProps = {
  value: number;
  percent: number;
  periodLabel?: string;
  trend?: "up" | "down";
};

export const PnlRow = ({
  value,
  percent,
  periodLabel = "Today",
  trend = "up",
}: PnlRowProps) => {
  const isUp = trend === "up";

  const tone = clsx(isUp ? "positive" : "negative") as "positive" | "negative";
  const sign = isUp ? "+" : "−";

  return (
    <div className="mt-1 flex items-center gap-1 text-sm font-medium">
      <Text size={"sm"} tone={tone}>
        {sign}${value}
      </Text>

      <Text size={"sm"} tone={tone} className="flex items-center gap-0.5">
        <ArrowIcon className={clsx(!isUp && "rotate-180 fill-red-500")} />
        <span>{percent}%</span>
      </Text>

      <Text size={"sm"} tone={"secondary"}>
        {periodLabel}
      </Text>
    </div>
  );
};
