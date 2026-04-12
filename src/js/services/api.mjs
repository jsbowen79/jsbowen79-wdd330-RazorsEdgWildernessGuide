/******************************************************************************
 * Fetch parks with search parameters
 *****************************************************************************/
export async function fetchNPS(queryParameters) {
  const baseURL = "https://developer.nps.gov/api/v1";

  const key = import.meta.env.VITE_NPS_API_KEY;
  try {
    const res = await fetch(`${baseURL}${queryParameters}&api_key=${key}`);
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

/******************************************************************************
 * Fetch weather
 *****************************************************************************/

export async function getWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}current_weather=true`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Weather API error: ${res.status}`);
    }
    const data = await res.json();
    return data.current_weather;
  } catch (error) {
    console.error(error);
  }
}
