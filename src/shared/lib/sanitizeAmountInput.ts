type SanitizeOpts = {
  max?: number;
  decimals?: number;
};

export function sanitizeAmountInput(raw: string, opts: SanitizeOpts = {}) {
  const { max, decimals = 6 } = opts;

  let v = raw.replace(/[^\d.,]/g, "").replace(/,/g, ".");

  const firstDot = v.indexOf(".");
  if (firstDot !== -1) {
    v = v.slice(0, firstDot + 1) + v.slice(firstDot + 1).replace(/\./g, "");
  }

  const [intPart, fracPart] = v.split(".");
  const frac = fracPart ? fracPart.slice(0, decimals) : undefined;

  const intNorm = intPart.replace(/^0+(?=\d)/, "");

  const out = firstDot !== -1 ? `${intNorm || "0"}.${frac ?? ""}` : intNorm;

  const n = Number(out);
  if (Number.isFinite(n) && out !== "" && out !== "." && !out.endsWith(".")) {
    if (max !== undefined && n > max) return String(max);
  }

  return out;
}
