const BASE_URL = "https://geocoding-api.open-meteo.com/v1";

export const geocodingApi = {
  searchCities: async (cityName) => {
    if (!cityName.trim()) {
      return { results: [] };
    }
    const params = new URLSearchParams({
      name: cityName,
      count: "10",
      language: "en",
      format: "json",
    });
    const response = await fetch(`${BASE_URL}/search?${params}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  },
};
