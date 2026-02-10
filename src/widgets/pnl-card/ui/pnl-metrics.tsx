"use client";

import NumberFlow, { NumberFlowGroup } from "@number-flow/react";

import { Heading } from "@/shared/ui/typography/heading";
import { Text } from "@/shared/ui/typography/text";
import { useMemo } from "react";

type PnlMetricsProps = {
  value: string;
  label: string;
};

export const PnlMetrics = ({ value, label }: PnlMetricsProps) => {
  const { sign, amount } = useMemo(() => {
    const s = value.trim();
    const isNeg = s.startsWith("-") || s.startsWith("−");

    const numeric = s.replace(/[^0-9.,-]/g, "").replace(/,/g, "");
    const num = Number(numeric);

    return {
      sign: Number(s) === 0 ? "" : isNeg ? "−" : "+",
      amount: Number.isFinite(num) ? Math.abs(num) : 0,
    };
  }, [value]);

  return (
    <div>
      <Heading
        as="h1"
        className="flex items-baseline gap-1 tracking-[-0.8px] h-12.75"
      >
        <span>{sign}</span>

        <NumberFlowGroup>
          <NumberFlow
            value={amount}
            locales="en-US"
            format={{
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }}
            className="text-[40px] tracking-[-0.8px]"
          />
        </NumberFlowGroup>
      </Heading>

      <Text size="sm" tone="secondary" className="mt-1">
        {label}
      </Text>
    </div>
  );
};
