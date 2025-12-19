import { useQuery } from '@tanstack/react-query'
import { getForecast } from '@/lib/actions'

export const useWeatherForecast = (latitude, longitude) => {
  return useQuery({
    queryKey: ['weather', latitude, longitude],
    queryFn: () => getForecast(latitude, longitude),
    staleTime: 10 * 60 * 1000,
  })
}