type PnlRange = "1h" | "6h" | "1d" | "1w" | "1m" | "all";
type Point = { ts: number; v: number };

const RANGE_CFG: Record<PnlRange, { points: number; stepHours: number }> = {
  "1h": { points: 24, stepHours: 1 },
  "6h": { points: 12, stepHours: 6 },
  "1d": { points: 24, stepHours: 24 },
  "1w": { points: 7, stepHours: 24 },
  "1m": { points: 30, stepHours: 24 },
  all: { points: 45, stepHours: 24 },
};

export function generateSeries(range: PnlRange, seed = 1): Point[] {
  const { points, stepHours } = RANGE_CFG[range];
  const now = Date.now();
  const stepMs = stepHours * 60 * 60 * 1000;

  let x = seed;
  const rand = () => {
    x = (x * 1664525 + 1013904223) % 2 ** 32;
    return x / 2 ** 32;
  };

  let v = 0;
  const data: Point[] = [];

  for (let i = points - 1; i >= 0; i--) {
    v += (rand() - 0.5) * 40;
    data.push({
      ts: now - i * stepMs,
      v: Math.round(v * 100) / 100,
    });
  }
  return data;
}
