import { useQuery } from "@tanstack/react-query";
import { searchCities } from "@/lib/actions";

export const useGeocodingSearch = (cityName) => {
    return useQuery({
        queryKey: ['geocoding', cityName],
        queryFn: () => searchCities(cityName),
        staleTime: 5 * 60 * 1000,
        enabled: cityName.length >= 2,
    })
}