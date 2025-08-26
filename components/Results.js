"use client";

import { useWeatherForecast } from "@/hooks/use-weather";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Droplet, UmbrellaOff, Wind } from "lucide-react";
import React, { useEffect, useState } from "react";

function Results({ latitude, longitude, cityName }) {
  const { data, isLoading, error, isFetching } = useWeatherForecast(
    latitude,
    longitude
  );

  useGSAP(() => {
    gsap.fromTo(
      ".skeleton-r",
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
    <div
      key={data}
      className="bg-gradient-to-br from-gray  w-[85%] md:w-100 to-white px-6 py-6 rounded-md shadow flex flex-col items-start justify-center gap-6"
    >
      {isLoading && isFetching && (
        <div className="flex flex-col items-center justify-center w-full gap-4">
          <div className="flex items-center justify-between w-full">
            <div className="text-3xl bg-gray h-11 w-[30%] rounded-md relative overflow-hidden">
              <span className="h-60 w-6  bg-gradient-to-r from-white to-gray absolute -top-30 rotate-45 left-20 skeleton-r"></span>
            </div>
            <div className="text-2xl bg-gray h-11 w-[30%] rounded-md relative overflow-hidden">
              <span className="h-60 w-6 bg-gradient-to-r from-white to-gray absolute -top-30 rotate-45 left-20 skeleton-r"></span>
            </div>
          </div>
          <div className="flex  items-center justify-between w-full">
            <div className="flex items-center justify-center gap-2 w-[10%] h-6 rounded-md bg-gray relative overflow-hidden">
              <span className="h-60 w-6 bg-gradient-to-r from-white to-gray absolute -top-30 rotate-45 left-20 skeleton-r"></span>
            </div>
            <div className="flex items-center justify-center gap-2 w-[10%] h-6 rounded-md bg-gray relative overflow-hidden">
              <span className="h-60 w-6 bg-gradient-to-r from-white to-gray absolute -top-30 rotate-45 left-20 skeleton-r"></span>
            </div>
          </div>
        </div>
      )}
      {!isFetching && !isLoading && !error ? (
        <div className="flex flex-col items-center justify-center w-full gap-4">
          <div className="flex items-center justify-between w-full">
            <div className="text-3xl mask-b-from-50%   mask-b-from-zinc-400">
              {cityName}
            </div>
            <div className="text-2xl mask-b-from-50%  mask-b-from-zinc-400">
              {data.current.temperature_2m} °C
            </div>
          </div>
          <div className="flex  items-center justify-between w-full">
            <div className="flex items-center justify-center gap-2 mask-b-from-50% mask-b-from-zinc-400">
              {data.current.wind_speed_10m}
              <Wind />
            </div>
            <div className="flex items-center justify-center gap-2 mask-b-from-50% mask-b-from-zinc-400">
              {data.current.relative_humidity_2m}
              <Droplet />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Results;
