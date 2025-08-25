import { useQuery } from '@tanstack/react-query'
import { weatherApi } from '../lib/weather-api'

export const useWeatherForecast = (latitude, longitude, enabled = false) => {
  return useQuery({
    queryKey: ['weather', latitude, longitude],
    queryFn: () => weatherApi.getForecast(latitude, longitude),
    enabled: enabled && !!latitude && !!longitude,
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  })
}