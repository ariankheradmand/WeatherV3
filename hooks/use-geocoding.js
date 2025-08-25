import { useQuery } from "@tanstack/react-query";
import { geocodingApi } from "@/lib/geocoding-api";

export const useGeocodingSearch = (cityName) => {
    return useQuery({
        queryKey: ['geocoding', cityName],
        queryFn: () => geocodingApi.searchCities(cityName),
        staleTime: 5 * 60 * 1000
    })
}