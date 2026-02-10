import { Point } from "@/shared/lib/pnl/types";

export function calcDailyPnl(series?: Point[] | null) {
  if (!Array.isArray(series) || series.length === 0) {
    return { delta: 0, percent: 0, trend: "up" as const, last: 0, prev: 0 };
  }

  const last = series[series.length - 1];
  const prev = series.length >= 2 ? series[series.length - 2] : last;

  const delta = last.v - prev.v;

  const base = Math.abs(prev.v) > 0 ? Math.abs(prev.v) : Math.abs(last.v);
  const percent = base > 0 ? (delta / base) * 100 : 0;

  return {
    delta,
    percent,
    trend: delta >= 0 ? ("up" as const) : ("down" as const),
    last: last.v,
    prev: prev.v,
  };
}
