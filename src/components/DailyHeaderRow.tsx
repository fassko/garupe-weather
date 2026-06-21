"use client";

import { format, isWeekend } from "date-fns";
import type { KeyboardEvent } from "react";
import { WindDirection } from "@/components/WindDirection";
import { getConditionEmoji } from "@/lib/weather/parse";
import type { DailySummary } from "@/lib/weather/daily";

const headerRowClassName =
  "border-t-2 border-sky-300 bg-sky-100 text-sky-900 transition-colors duration-150 hover:bg-sky-300 dark:border-sky-700 dark:bg-sky-950 dark:text-sky-200 dark:hover:bg-sky-800";

const weekendDateClassName = "text-red-600 dark:text-red-400";

interface DailyHeaderRowProps {
  date: Date;
  summary: DailySummary;
  variant: "hourly" | "detailed";
  expanded?: boolean;
  onToggle?: () => void;
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

function dayLabelClassName(date: Date): string {
  return `whitespace-nowrap px-2 py-2 text-xs font-semibold uppercase tracking-wide sm:px-4${
    isWeekend(date) ? ` ${weekendDateClassName}` : ""
  }`;
}

function DayLabel({ date, compact = false }: { date: Date; compact?: boolean }) {
  if (compact) {
    return (
      <>
        <span className="sm:hidden">{format(date, "EEE, MMM d")}</span>
        <span className="hidden sm:inline">{format(date, "EEEE, MMMM d")}</span>
      </>
    );
  }

  return format(date, "EEEE, MMMM d");
}

function ExpandArrow({ expanded }: { expanded: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={`h-3.5 w-3.5 shrink-0 transition-transform duration-150 ${
        expanded ? "rotate-90" : ""
      }`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function DayLabelCell({
  date,
  compact,
  expanded,
  showArrow,
}: {
  date: Date;
  compact?: boolean;
  expanded?: boolean;
  showArrow: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {showArrow ? <ExpandArrow expanded={expanded ?? false} /> : null}
      <DayLabel date={date} compact={compact} />
    </span>
  );
}

export function DailyHeaderRow({
  date,
  summary,
  variant,
  expanded,
  onToggle,
}: DailyHeaderRowProps) {
  const label = format(date, "EEEE, MMMM d");
  const rowClassName = onToggle
    ? `${headerRowClassName} cursor-pointer`
    : headerRowClassName;
  const toggleCellProps = onToggle ? { onClick: onToggle } : {};
  const rowProps = onToggle
    ? {
        onKeyDown: (event: KeyboardEvent<HTMLTableRowElement>) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onToggle();
          }
        },
        tabIndex: 0,
        role: "button" as const,
        "aria-expanded": expanded,
        "aria-label": `${expanded ? "Collapse" : "Expand"} ${variant} forecast for ${label}`,
      }
    : {};

  if (variant === "hourly") {
    return (
      <tr className={rowClassName} {...rowProps}>
        <td className={dayLabelClassName(date)} {...toggleCellProps}>
          <DayLabelCell date={date} compact expanded={expanded} showArrow={Boolean(onToggle)} />
        </td>
        <td className="px-2 py-2 sm:px-4" {...toggleCellProps}>
          <span aria-hidden="true">{getConditionEmoji(summary.representativeIconCode)}</span>
        </td>
        <td className="px-2 py-2 text-sm font-semibold tabular-nums sm:px-4" {...toggleCellProps}>
          {formatRange(summary.minTemperature, summary.maxTemperature, "°C")}
        </td>
        <td
          className="px-2 py-2 text-sm font-semibold tabular-nums text-sky-800 sm:px-4 dark:text-sky-300"
          {...toggleCellProps}
        >
          {formatPrecipSummary(summary)}
        </td>
      </tr>
    );
  }

  return (
    <tr className={rowClassName} {...rowProps}>
      <td className={dayLabelClassName(date)} {...toggleCellProps}>
        <DayLabelCell date={date} compact expanded={expanded} showArrow={Boolean(onToggle)} />
      </td>
      <td className="px-4 py-2 text-sm font-semibold tabular-nums" {...toggleCellProps}>
        {formatRange(summary.minTemperature, summary.maxTemperature, "°C")}
      </td>
      <td className="px-4 py-2 text-sm font-semibold tabular-nums" {...toggleCellProps}>
        {formatRange(summary.minFeelsLike, summary.maxFeelsLike, "°C")}
      </td>
      <td className="px-4 py-2 text-sm font-semibold tabular-nums" {...toggleCellProps}>
        {summary.totalPrecipitation.toFixed(1)} mm
      </td>
      <td className="px-4 py-2 text-sm font-semibold tabular-nums" {...toggleCellProps}>
        Up to {Math.round(summary.maxPrecipitationProbability)}%
      </td>
      <td className="px-4 py-2 text-sm font-semibold tabular-nums" {...toggleCellProps}>
        Avg {Math.round(summary.avgHumidity)}%
      </td>
      <td
        className="whitespace-nowrap px-4 py-2 text-sm font-semibold tabular-nums"
        {...toggleCellProps}
      >
        Up to {summary.maxWindSpeed.toFixed(1)} m/s{" "}
        <WindDirection degrees={summary.windDirectionAtMaxWind} size="sm" />
      </td>
      <td className="px-4 py-2 text-sm font-semibold tabular-nums" {...toggleCellProps}>
        Avg {summary.avgPressure.toFixed(1)} hPa
      </td>
    </tr>
  );
}
