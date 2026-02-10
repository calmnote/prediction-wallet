"use client";

import * as React from "react";
import { Card } from "@/shared/ui/card";

import { PnlHeader } from "./pnl-header";
import { PnlMetrics } from "./pnl-metrics";
import { PnlChart } from "./pnl-chart";
import type { PnlRange } from "./pnl-tabs";
import { useState } from "react";
import type { Point } from "./pnl-chart";
import { generateSeries } from "@/shared/lib/generateSeries";
import { LogoIcon } from "@/shared/ui/icons";

const mockByRange: Record<PnlRange, any[]> = {
  "1h": generateSeries("1h", 11),
  "6h": generateSeries("6h", 22),
  "1d": generateSeries("1d", 33),
  "1w": generateSeries("1w", 44),
  "1m": generateSeries("1m", 55),
  all: generateSeries("all", 66),
};

const rangeLabel: Record<PnlRange, string> = {
  "1h": "Past Day",
  "6h": "Past Day",
  "1d": "Past Day",
  "1w": "Past Week",
  "1m": "Past Month",
  all: "All time",
};

export const PnlCard = () => {
  const [range, setRange] = useState<PnlRange>("6h");
  const [hoverPoint, setHoverPoint] = useState<Point | null>(null);

  const data = mockByRange[range];
  const last = data.at(-1);

  const label = hoverPoint
    ? new Date(hoverPoint.ts).toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : rangeLabel[range];

  return (
    <Card className="flex flex-col gap-6 w-full max-w-159.75 p-5">
      <div className="flex flex-col gap-1.25">
        <PnlHeader
          range={range}
          onRangeChange={setRange}
          isPositive={(hoverPoint?.v ?? last.v) < 0}
        />

        <div className="flex items-center justify-between">
          <PnlMetrics
            value={`${(hoverPoint?.v ?? last.v).toFixed(2)}`}
            label={label}
          />
          <LogoIcon />
        </div>

        <PnlChart data={data} onHover={(p) => setHoverPoint(p)} />
      </div>
    </Card>
  );
};
