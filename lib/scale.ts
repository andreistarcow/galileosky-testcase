/**
 * Compute percentile value of a sorted numeric array.
 * @param sorted Sorted array of numbers (ascending).
 * @param p Percentile in [0, 1].
 */
export function percentile(sorted: number[], p: number) {
  if (sorted.length === 0) return 0;
  const idx = (sorted.length - 1) * p;
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  const w = idx - lo;
  return (1 - w) * sorted[lo] + w * sorted[hi];
}

const clamp01 = (t: number) => Math.max(0, Math.min(1, t));

/**
 * Robust normalization: scale values to [0, 1] using lower/upper percentiles.
 * - By default uses P5..P95.
 * - Reduces the effect of outliers and improves contrast for the bulk of data.
 *
 * @param value  Current value to normalize.
 * @param sorted Sorted array of numbers (ascending).
 * @param pLow   Lower percentile cutoff (default 0.05).
 * @param pHigh  Upper percentile cutoff (default 0.95).
 */
export function normalizeRobust(
  value: number,
  sorted: number[],
  pLow = 0.05,
  pHigh = 0.95
) {
  if (sorted.length === 0) return 0.5;
  const lo = percentile(sorted, pLow);
  const hi = percentile(sorted, pHigh);
  const min = lo;
  const max = hi > lo ? hi : sorted[sorted.length - 1];
  return min === max ? 0.5 : clamp01((value - min) / (max - min));
}
