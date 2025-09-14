export interface ParseStats {
  valid: number;
  discarded: number;
  total: number;
}

export interface ParseResult {
  values: number[];
  stats: ParseStats;
}

/**
 * Token splitting pattern:
 * - splits on whitespace, commas, or semicolons
 */
const TOKEN_DELIMITER_REGEX = /[\s,;]+/g;

/**
 * Number detection pattern (matches one number per token):
 * - optional leading sign
 * - integer or decimal format
 * - optional scientific notation (e.g., 1.23e-4)
 */
const NUMBER_PATTERN_REGEX = /^[-+]?\d*\.?\d+(?:e[-+]?\d+)?$/i;

export function parseNumbers(input: string): ParseResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { values: [], stats: { valid: 0, discarded: 0, total: 0 } };
  }

  const tokens = trimmed.split(TOKEN_DELIMITER_REGEX).filter(Boolean);

  const values: number[] = [];
  let validCount = 0;
  let discardedCount = 0;

  for (const token of tokens) {
    if (!NUMBER_PATTERN_REGEX.test(token)) {
      discardedCount++;
      continue;
    }

    const numericValue = Number(token);
    if (Number.isFinite(numericValue)) {
      values.push(numericValue);
      validCount++;
    } else {
      discardedCount++;
    }
  }

  return {
    values,
    stats: {
      valid: validCount,
      discarded: discardedCount,
      total: tokens.length,
    },
  };
}
