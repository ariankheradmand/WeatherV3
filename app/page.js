"use client"

import Daily from "@/components/Daily";
import Results from "@/components/Results";
import Search from "@/components/Search";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();

  const [latitude, setLatitude] = useState(35.6944);
  const [longitude, setLongitude] = useState(51.4215);
  const [cityName, setCityName] = useState("Tehran");

  useEffect(() => {
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    const city = searchParams.get("city");

    if (lat) setLatitude(parseFloat(lat));
    if (lon) setLongitude(parseFloat(lon));
    if (city) setCityName(city);
  }, [searchParams]);

  return (
    <div className="font-nunito h-full w-full flex flex-col gap-10 items-center justify-start mt-6">
      <div className=" bg-gradient-to-br from-gray to-white w-[85%] md:w-100 px-6 py-6 rounded-md shadow flex flex-col items-center justify-center gap-6">
        <h1 className="text-black/60 text-lg md:text-2xl ">
          Today’s Sky Report
        </h1>
        <Search />
      </div>
      <Results latitude={latitude} longitude={longitude} cityName={cityName} />
      <Daily latitude={latitude} longitude={longitude} />
    </div>
  );
}
