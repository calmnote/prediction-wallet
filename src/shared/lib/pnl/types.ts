import * as React from "react";
import type { AreaChart } from "recharts";

export type Point = { ts: number; v: number };
export type PnlRange = "1h" | "6h" | "1d" | "1w" | "1m" | "all";

export type AreaMouseState = Parameters<
  NonNullable<React.ComponentProps<typeof AreaChart>["onMouseMove"]>
>[0];
