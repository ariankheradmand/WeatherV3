"use client";
import { useState } from "react";
import { useGeocodingSearch } from "../hooks/use-geocoding";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function CitySearch({ setLongitude, setLatitude , setCityName}) {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, error, isFetching } = useGeocodingSearch(searchTerm);

  

  useGSAP(() => {
    gsap.fromTo(
      ".skeleton",
      { top: "-50px", left: "-100px" },
      {
        top: "-30",
        left: "100%",
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power1",
      }
    );
  }, [isFetching]);

  return (
    <div className="w-full flex flex-col items-center justify-center relative ">
      {/* Search Input */}
      <div className="w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter the city name..."
          className={`w-full outline-none focus:ring-0 focus:outline-none px-4 py-2 border border-gray-300 rounded-md`}
        />

        {isFetching && (
          <div className="w-full flex flex-col gap-2 bg-white py-2 shadow px-1  rounded-md absolute top-[44px] z-500">
            {Array.from({ length: 10 }).map((_, i) => {
              return (
                <div
                  key={i}
                  className="bg-gray w-full h-10 rounded-md relative overflow-hidden"
                >
                  <span className="h-60 w-6 bg-gradient-to-r from-white to-gray absolute -top-30 rotate-45 left-20 skeleton"></span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          Error: {error.message}
        </div>
      )}

      {/* Results */}

      {data?.results && data.results.length > 0 && (
        <div className="w-full flex flex-col gap-2 bg-white py-2 shadow px-1 rounded-md absolute top-[44px] z-500">
          {data.results
            .slice()
            .sort((a, b) => b.population - a.population)
            .map((city) => (
              <div
                onClick={() => {
                  setLatitude(city.latitude);
                  setLongitude(city.longitude);
                  setCityName(city.name);
                  console.log(city.longitude , city.latitude)
                  setSearchTerm("")
                }}
                key={city.id}
                className="bg-gray w-full h-10 rounded-md relative overflow-hidden px-2 flex items-center justify-between hover:scale-101 hover:bg-gray/45 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between w-full gap-2 relative">
                  <div className="flex items-center justify-center gap-2">
                    <h3 className="text-[16px]">{city.name}</h3>

                    <h2 className="text-sm opacity-80 ">{city.admin1}</h2>
                  </div>
                  {city.country_code && (
                    <img
                      src={`https://flagcdn.com/40x30/${city.country_code.toLowerCase()}.png`}
                      alt={city.country_code}
                      className="w-5 h-4 rounded-sm object-cover"
                    />
                  )}
                </div>
              </div>
            ))}
        </div>
      )}

      {/* No Results */}
      {!isLoading &&
        searchTerm.length >= 2 &&
        Array.isArray(data?.results) &&
        data.results.length === 0 && (
          <div className="text-center text-gray-500 py-8">No city founded!</div>
        )}
    </div>
  );
}
