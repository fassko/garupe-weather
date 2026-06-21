import { NextResponse } from "next/server";
import { getHourlyForecast, REVALIDATE_SECONDS } from "@/lib/weather/fetch";

export async function GET() {
  try {
    const data = await getHourlyForecast();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=600`,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch weather data";

    return NextResponse.json({ error: message }, { status: 502 });
  }
}
