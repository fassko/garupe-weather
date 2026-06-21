import { HourlyForecastList } from "@/components/HourlyForecast";
import { WeatherChartSection } from "@/components/WeatherChartSection";
import { WeatherHeader } from "@/components/WeatherHeader";
import { WeatherTable } from "@/components/WeatherTable";
import { getHourlyForecast } from "@/lib/weather/fetch";

export default async function Home() {
  const data = await getHourlyForecast();

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6">
      <WeatherHeader data={data} />
      <WeatherChartSection forecasts={data.forecasts} />
      <HourlyForecastList forecasts={data.forecasts} />
      <WeatherTable forecasts={data.forecasts} />
      <footer className="pb-4 text-center text-xs text-slate-500 dark:text-slate-400">
        Data from{" "}
        <a
          href="https://videscentrs.lvgmc.lv/"
          className="underline hover:text-slate-700 dark:hover:text-slate-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          LVĢMC
        </a>
        . Updated every 30 minutes.
      </footer>
    </main>
  );
}
