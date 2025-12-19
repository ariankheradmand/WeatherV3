"use server";

const GEOC_BASE_URL = "https://geocoding-api.open-meteo.com/v1";
const WEATHER_BASE_URL = 'https://api.open-meteo.com/v1';

export async function searchCities(cityName) {
    if (!cityName || cityName.trim().length < 2) {
        return { results: [] };
    }

    const params = new URLSearchParams({
        name: cityName,
        count: "10",
        language: "en",
        format: "json",
    });

    try {
        const response = await fetch(`${GEOC_BASE_URL}/search?${params}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error searching cities:", error);
        return { results: [], error: error.message };
    }
}

export async function getForecast(latitude, longitude) {
    if (!latitude || !longitude) {
        return { error: 'Latitude and longitude are required' };
    }

    const params = new URLSearchParams({
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        hourly: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
        daily: 'temperature_2m_max,temperature_2m_min,weather_code,wind_speed_10m_max',
        current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
        timezone: 'auto',
        forecast_days: '7'
    });

    try {
        const response = await fetch(`${WEATHER_BASE_URL}/forecast?${params}`, {
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching forecast:", error);
        return { error: error.message };
    }
}
