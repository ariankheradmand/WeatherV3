"use client"

import Results from "@/components/Results";
import Search from "@/components/Search";
import { useState } from "react";

export default function Home() {
  const [latitude, setLatitude] = useState(35.6944);
  const [longitude, setLongitude] = useState(51.4215);
  const [cityName , setCityName] = useState("Tehran")

  return (
    <div className="font-nunito h-full w-full flex flex-col gap-10 items-center justify-start mt-6">
      <div className=" bg-gradient-to-br from-gray to-white w-[85%] md:w-100 px-6 py-6 rounded-md shadow flex flex-col items-start justify-center gap-6">
        <h1 className="text-black/60 text-lg md:text-2xl">
          Welcome to the Weather today
        </h1>
        <Search setLatitude={setLatitude} setLongitude={setLongitude} setCityName={setCityName} />
      </div>
      <Results latitude={latitude} longitude={longitude} cityName={cityName} />
    </div>
  );
}
