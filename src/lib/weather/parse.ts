import { parse } from "date-fns";
import type { HourlyForecast, HourlyForecastRaw } from "./types";

export function parseNumber(value: string | null | undefined): number {
  if (value == null || value === "") return 0;
  const num = Number.parseFloat(value);
  return Number.isFinite(num) ? num : 0;
}

export function parseLaiks(laiks: string): Date {
  return parse(laiks, "yyyyMMddHHmm", new Date());
}

export function parseHourlyForecast(raw: HourlyForecastRaw): HourlyForecast {
  return {
    time: parseLaiks(raw.laiks),
    temperature: parseNumber(raw.temperatura),
    feelsLike: parseNumber(raw.sajutu_temperatura),
    precipitation: parseNumber(raw.nokrisni_1h),
    humidity: parseNumber(raw.relativais_mitrums),
    windSpeed: parseNumber(raw.veja_atrums),
    windGust: parseNumber(raw.brazmas),
    windDirection: parseNumber(raw.veja_virziens),
    pressure: parseNumber(raw.spiediens),
    cloudCover: parseNumber(raw.makoni),
    iconCode: raw.laika_apstaklu_ikona,
    precipitationProbability: parseNumber(raw.nokrisnu_varbutiba),
    uvIndex: raw.uvi_indekss != null ? parseNumber(raw.uvi_indekss) : null,
    thunderProbability: parseNumber(raw.perkons),
  };
}

const DIRECTIONS = [
  "N",
  "NNE",
  "NE",
  "ENE",
  "E",
  "ESE",
  "SE",
  "SSE",
  "S",
  "SSW",
  "SW",
  "WSW",
  "W",
  "WNW",
  "NW",
  "NNW",
] as const;

export function getWindDirection(degrees: number): string {
  const index = Math.round(degrees / 22.5) % 16;
  return DIRECTIONS[index];
}

export function getConditionLabel(iconCode: string): string {
  const code = iconCode.slice(1);
  const isNight = iconCode.startsWith("2");

  const conditions: Record<string, string> = {
    "101": isNight ? "Clear" : "Sunny",
    "102": "Partly cloudy",
    "103": "Cloudy",
    "104": "Overcast",
    "201": "Fog",
    "202": "Light fog",
    "203": "Mist",
    "204": "Overcast",
    "301": "Light rain",
    "302": "Rain",
    "303": "Heavy rain",
    "304": "Thunderstorm",
    "305": "Thunderstorm with rain",
    "306": "Thunderstorm with hail",
    "401": "Light snow",
    "402": "Snow",
    "403": "Heavy snow",
    "404": "Sleet",
    "501": "Light drizzle",
    "502": "Drizzle",
    "503": "Freezing rain",
    "504": "Freezing drizzle",
    "505": "Rain showers",
    "506": "Rain showers",
  };

  return conditions[code] ?? (isNight ? "Night" : "Day");
}

export function getConditionEmoji(iconCode: string): string {
  const code = iconCode.slice(1);
  const isNight = iconCode.startsWith("2");

  if (code.startsWith("50") || code.startsWith("30")) return "🌧️";
  if (code.startsWith("40")) return "❄️";
  if (code === "104" || code === "204") return "☁️";
  if (code === "103" || code === "203") return "🌥️";
  if (code === "102" || code === "202") return isNight ? "🌙" : "⛅";
  if (code === "101" || code === "201") return isNight ? "🌙" : "☀️";
  if (code.startsWith("30")) return "⛈️";

  return isNight ? "🌙" : "🌤️";
}
