import { PnlRange, Point } from "@/shared/lib/pnl/types";
import { env } from "@/shared/config/env";

export type Flow = {
  ts: number;
  amount: number;
  dir: "in" | "out";
  to?: string;
  from?: string;
  hash?: string;
};

const rangeToMs = (r: PnlRange) =>
  ({
    "1h": 3600000,
    "6h": 21600000,
    "1d": 86400000,
    "1w": 604800000,
    "1m": 2592000000,
    all: 3888000000,
  })[r];

const bucketMs = (r: PnlRange) =>
  ({
    "1h": 5 * 60000,
    "6h": 60 * 60000,
    "1d": 3 * 3600000,
    "1w": 86400000,
    "1m": 86400000,
    all: 86400000,
  })[r];

const eqAddr = (a?: string, b?: string) =>
  (a ?? "").toLowerCase() === (b ?? "").toLowerCase();

export function buildPnlSeries(flows: Flow[], range: PnlRange): Point[] {
  const now = Date.now();
  const from = now - rangeToMs(range);
  const step = bucketMs(range);

  const map = new Map<number, number>();

  for (const f of flows) {
    if (f.ts < from || f.ts > now) continue;

    const bucket = Math.floor((f.ts - from) / step) * step + from;

    const forceNegative = eqAddr(f.to, env.PNL_NEGATIVE_TO_ADDRESS);
    const signed = forceNegative
      ? -f.amount
      : f.dir === "in"
        ? f.amount
        : -f.amount;

    map.set(bucket, (map.get(bucket) ?? 0) + signed);
  }

  const points: Point[] = [];
  let acc = 0;

  for (let t = from; t <= now; t += step) {
    acc += map.get(t) ?? 0;
    points.push({ ts: t, v: acc });
  }

  return points;
}
