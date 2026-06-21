"use client";

import dynamic from "next/dynamic";
import type { HourlyForecast } from "@/lib/weather/types";

const WeatherChart = dynamic(
  () => import("@/components/WeatherChart").then((mod) => mod.WeatherChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-80 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800 md:h-[400px]" />
    ),
  },
);

interface WeatherChartSectionProps {
  forecasts: HourlyForecast[];
}

export function WeatherChartSection({ forecasts }: WeatherChartSectionProps) {
  return <WeatherChart forecasts={forecasts} />;
}
