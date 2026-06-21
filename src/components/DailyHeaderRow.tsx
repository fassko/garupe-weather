import { format } from "date-fns";
import { getConditionEmoji, getWindDirection } from "@/lib/weather/parse";
import type { DailySummary } from "@/lib/weather/daily";

const headerRowClassName =
  "border-t-2 border-sky-300 bg-sky-100 text-sky-900 dark:border-sky-700 dark:bg-sky-950 dark:text-sky-200";

interface DailyHeaderRowProps {
  date: Date;
  summary: DailySummary;
  variant: "hourly" | "detailed";
}

function formatRange(min: number, max: number, unit: string): string {
  if (Math.round(min) === Math.round(max)) {
    return `${Math.round(min)}${unit}`;
  }

  return `${Math.round(min)}${unit} – ${Math.round(max)}${unit}`;
}

function formatPrecipSummary(summary: DailySummary): string {
  if (summary.totalPrecipitation > 0) {
    return `${summary.totalPrecipitation.toFixed(1)} mm total`;
  }

  return `Up to ${Math.round(summary.maxPrecipitationProbability)}%`;
}

export function DailyHeaderRow({ date, summary, variant }: DailyHeaderRowProps) {
  if (variant === "hourly") {
    return (
      <tr className={headerRowClassName}>
        <td className="whitespace-nowrap px-4 py-2 text-xs font-semibold uppercase tracking-wide">
          {format(date, "EEEE, MMMM d")}
        </td>
        <td className="px-4 py-2">
          <span aria-hidden="true">{getConditionEmoji(summary.representativeIconCode)}</span>
        </td>
        <td className="px-4 py-2 text-sm font-semibold tabular-nums">
          {formatRange(summary.minTemperature, summary.maxTemperature, "°C")}
        </td>
        <td className="px-4 py-2 text-sm font-semibold tabular-nums text-sky-800 dark:text-sky-300">
          {formatPrecipSummary(summary)}
        </td>
      </tr>
    );
  }

  return (
    <tr className={headerRowClassName}>
      <td className="whitespace-nowrap px-4 py-2 text-xs font-semibold uppercase tracking-wide">
        {format(date, "EEEE, MMMM d")}
      </td>
      <td className="px-4 py-2 text-sm font-semibold tabular-nums">
        {formatRange(summary.minTemperature, summary.maxTemperature, "°C")}
      </td>
      <td className="px-4 py-2 text-sm font-semibold tabular-nums">
        {formatRange(summary.minFeelsLike, summary.maxFeelsLike, "°C")}
      </td>
      <td className="px-4 py-2 text-sm font-semibold tabular-nums">
        {summary.totalPrecipitation.toFixed(1)} mm
      </td>
      <td className="px-4 py-2 text-sm font-semibold tabular-nums">
        Up to {Math.round(summary.maxPrecipitationProbability)}%
      </td>
      <td className="px-4 py-2 text-sm font-semibold tabular-nums">
        Avg {Math.round(summary.avgHumidity)}%
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-sm font-semibold tabular-nums">
        Up to {summary.maxWindSpeed.toFixed(1)} m/s{" "}
        {getWindDirection(summary.windDirectionAtMaxWind)}
      </td>
      <td className="px-4 py-2 text-sm font-semibold tabular-nums">
        Avg {summary.avgPressure.toFixed(1)} hPa
      </td>
    </tr>
  );
}
