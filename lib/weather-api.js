const BASE_URL = 'https://api.open-meteo.com/v1'

export const weatherApi = {
  getForecast: async (latitude, longitude) => {
    if (!latitude || !longitude) {
      throw new Error('Latitude and longitude are required')
    }

    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      hourly: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
      daily: 'temperature_2m_max,temperature_2m_min,weather_code,wind_speed_10m_max',
      current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
      timezone: 'auto',
      forecast_days: '7'
    })

    const response = await fetch(`${BASE_URL}/forecast?${params}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  }
}