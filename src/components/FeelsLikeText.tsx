import {
  formatFeelsLikeValue,
  getFeelsLikeComparison,
  type FeelsLikeComparison,
} from "@/lib/weather/feelsLike";

interface FeelsLikeTextProps {
  temperature: number;
  feelsLike: number;
  precision?: number;
  variant?: "header" | "table";
  showLabel?: boolean;
}

const deltaClassNames: Record<Exclude<FeelsLikeComparison, "same">, Record<"header" | "table", string>> =
  {
    colder: {
      header: "text-cyan-200",
      table: "text-sky-600 dark:text-sky-400",
    },
    warmer: {
      header: "text-amber-200",
      table: "text-amber-600 dark:text-amber-400",
    },
  };

export function FeelsLikeText({
  temperature,
  feelsLike,
  precision = 0,
  variant = "header",
  showLabel = variant === "header",
}: FeelsLikeTextProps) {
  const { comparison, delta } = getFeelsLikeComparison(temperature, feelsLike);
  const value = formatFeelsLikeValue(feelsLike, precision);
  const prefix = showLabel ? "Feels like " : "";

  if (comparison === "same") {
    return <>{prefix}{value}</>;
  }

  return (
    <>
      {prefix}
      {value}{" "}
      <span className={deltaClassNames[comparison][variant]}>
        · {delta}° {comparison}
      </span>
    </>
  );
}
