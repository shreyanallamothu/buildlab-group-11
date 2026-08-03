const OPENWEATHER_CURRENT_URL =
  "https://api.openweathermap.org/data/2.5/weather";

export async function GET(request: Request) {
  const city = new URL(request.url).searchParams.get("city")?.trim();

  if (!city) {
    return Response.json(
      { error: "A city query parameter is required." },
      { status: 400 }
    );
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    console.error("OPENWEATHER_API_KEY is not configured.");
    return Response.json(
      { error: "Weather service is not configured." },
      { status: 500 }
    );
  }

  const weatherUrl = new URL(OPENWEATHER_CURRENT_URL);
  weatherUrl.searchParams.set("q", city);
  weatherUrl.searchParams.set("appid", apiKey);
  weatherUrl.searchParams.set("units", "metric");

  try {
    const weatherResponse = await fetch(weatherUrl, { cache: "no-store" });
    const weatherData: unknown = await weatherResponse.json();

    if (!weatherResponse.ok) {
      return Response.json(
        { error: "Unable to retrieve weather for that city." },
        { status: weatherResponse.status }
      );
    }

    return Response.json(weatherData);
  } catch (error) {
    console.error("OpenWeatherMap request failed:", error);
    return Response.json(
      { error: "Weather service is currently unavailable." },
      { status: 502 }
    );
  }
}
