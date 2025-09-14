/** Clamp a number to [0, 1]. */
function clampToUnit(value: number): number {
  return Math.min(1, Math.max(0, value));
}

/** Convert an 8-bit channel (0–255) to a two-digit lowercase hex string. */
function toHexByte(channel: number): string {
  return channel.toString(16).padStart(2, "0");
}

/** Compose a hex color string from three 8-bit channels. */
function rgbToHex(r: number, g: number, b: number): string {
  return `#${toHexByte(r)}${toHexByte(g)}${toHexByte(b)}`;
}

/**
 * Convert HSL to HEX.
 * @param h Hue in degrees [0, 360)
 * @param s Saturation in percent [0, 100]
 * @param l Lightness in percent [0, 100]
 */
function hslToHexColor(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);

  const f = (n: number) => {
    const channel =
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return Math.round(255 * channel);
  };

  const r = f(0);
  const g = f(8);
  const b = f(4);

  return rgbToHex(r, g, b);
}

/**
 * Map a normalized value `t ∈ [0,1]` to HEX using an HSL hue sweep with gamma.
 *
 * - Gamma correction biases perceived progression along the hue:
 *     t' = t ** gamma
 * - Hue path: 120° (green) → 0° (red), i.e., green → yellow → red.
 * - Fixed saturation/lightness chosen for contrast: S=70%, L=45%.
 *
 * @param t      normalized input in [0, 1]
 * @param gamma  gamma correction exponent (default 0.75)
 */
export function mapNormalizedToHexViaHsl(t: number, gamma: number = 0.75): string {
  const tGamma = Math.pow(clampToUnit(t), gamma); // gamma correction
  const hue = 120 * (1 - tGamma); // 120° (green) → 0° (red)
  const saturation = 70;
  const lightness = 45;
  return hslToHexColor(hue, saturation, lightness);
}
