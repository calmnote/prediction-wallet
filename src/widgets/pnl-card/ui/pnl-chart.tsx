"use client";

import * as React from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis } from "recharts";

export type Point = { ts: string; v: number };

type PnlChartProps = {
  data: Point[];
  onHover?: (p: Point | null, index?: number) => void;
  yDomain?: [number, number];
};
export const PnlChart = ({ data, onHover }: PnlChartProps) => {
  return (
    <div className="pnl-chart h-[87.5px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 6, right: 6, left: 0, bottom: 0 }}
          onMouseMove={(state: any) => {
            const idxRaw = state?.activeTooltipIndex ?? state?.activeIndex;
            if (idxRaw === undefined || idxRaw === null) return;

            const idx = typeof idxRaw === "string" ? Number(idxRaw) : idxRaw;
            if (!Number.isFinite(idx)) return;

            const point = data[idx];
            if (point) onHover?.(point);
          }}
          onMouseLeave={() => onHover?.(null)}
        >
          <defs>
            <linearGradient id="pnlFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FF5100" stopOpacity={0.3} />
              <stop offset="1" stopColor="#FF5100" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis dataKey="ts" hide />

          <Area
            type="monotone"
            dataKey="v"
            stroke="#FF5100"
            strokeWidth={3}
            fill="url(#pnlFill)"
            dot={false}
            activeDot={{ r: 4 }}
            animationDuration={200}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
