"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Card } from "@/shared/ui/card";

import { PnlHeader } from "./pnl-header";
import { PnlMetrics } from "./pnl-metrics";
import { PnlChart } from "./pnl-chart";
import type { PnlRange } from "./pnl-tabs";
import { LogoIcon } from "@/shared/ui/icons";
import { getPnlSeries } from "@/actions/get-pnl-series";
import { Point } from "@/shared/lib/pnl/types";

const rangeLabel: Record<PnlRange, string> = {
  "1h": "Past hour",
  "6h": "Past 6 hours",
  "1d": "Past Day",
  "1w": "Past Week",
  "1m": "Past Month",
  all: "All time",
};

type Props = { initialData: Point[] };

export function PnlCard({ initialData }: Props) {
  const [range, setRange] = useState<PnlRange>("6h");
  const [hoverPoint, setHoverPoint] = useState<Point | null>(null);
  const [data, setData] = useState<Point[]>(initialData ?? []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setHoverPoint(null);

      try {
        const res = await getPnlSeries(range);
        if (!cancelled) setData(res);
      } catch (e) {
        console.error(e);
        if (!cancelled) setData([]);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [range]);

  const last = data.length ? data[data.length - 1] : null;
  const currentV = hoverPoint?.v ?? last?.v ?? 0;

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
          isPositive={currentV >= 0}
        />

        <div className="flex items-center justify-between">
          <PnlMetrics value={currentV.toFixed(2)} label={label} />
          <LogoIcon />
        </div>

        <PnlChart data={data} onHover={setHoverPoint} />
      </div>
    </Card>
  );
}
