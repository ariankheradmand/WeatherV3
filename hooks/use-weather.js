import { useQuery } from '@tanstack/react-query'
import { weatherApi } from '../lib/weather-api'

export const useWeatherForecast = (latitude, longitude) => {
  return useQuery({
    queryKey: ['weather', latitude, longitude],
    queryFn: () => weatherApi.getForecast(latitude, longitude),
    staleTime: 10 * 60 * 1000, 
    cacheTime: 30 * 60 * 1000, 
  })
}