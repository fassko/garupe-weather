import { parseHourlyForecast } from "./parse";
import type { HourlyForecastRaw, WeatherData } from "./types";

export const WEATHER_API_URL =
  "https://videscentrs.lvgmc.lv/data/weather_forecast_for_location_hourly?punkts=P1134";

export const REVALIDATE_SECONDS = 1800;

export async function getHourlyForecast(): Promise<WeatherData> {
  const response = await fetch(WEATHER_API_URL, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Weather API returned ${response.status}`);
  }

  const raw = (await response.json()) as HourlyForecastRaw[];

  if (!Array.isArray(raw) || raw.length === 0) {
    throw new Error("Weather API returned empty data");
  }

  const first = raw[0];

  return {
    location: {
      id: first.punkts,
      name: first.nosaukums,
      region: first.novads,
    },
    forecasts: raw.map(parseHourlyForecast),
  };
}
