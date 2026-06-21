export type FeelsLikeComparison = "same" | "warmer" | "colder";

export function getFeelsLikeComparison(
  temperature: number,
  feelsLike: number,
): { comparison: FeelsLikeComparison; delta: number } {
  const roundedDelta = Math.round(feelsLike - temperature);

  if (Math.abs(roundedDelta) < 1) {
    return { comparison: "same", delta: 0 };
  }

  return {
    comparison: roundedDelta > 0 ? "warmer" : "colder",
    delta: Math.abs(roundedDelta),
  };
}

export function formatFeelsLikeValue(feelsLike: number, precision = 0): string {
  return precision === 0 ? `${Math.round(feelsLike)}°C` : `${feelsLike.toFixed(precision)}°C`;
}
