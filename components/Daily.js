"use client";

import React, { useRef, useState, useEffect } from "react";
import { useWeatherForecast } from "@/hooks/use-weather";
import {
  Droplet,
  Umbrella,
  Cloud,
  CloudSun,
  CloudMoon,
  CloudFog,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Sun,
  Moon,
  Wind,
  SunDim,
  Snowflake,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Daily({ latitude, longitude }) {
  const { data, isLoading, error, isFetching } = useWeatherForecast(
    latitude,
    longitude
  );

  const weatherCodeToIcon = (code) => {
    switch (code) {
      case 0: // Clear sky
        return <Sun className=" size-17 md:size-25 " />;
      case 1: // Mainly clear
      case 2: // Partly cloudy
        return <CloudSun className=" size-17 md:size-25 " />;
      case 3: // Overcast
        return <Cloud className=" size-17 md:size-25 " />;
      case 45: // Fog
      case 48: // Depositing rime fog
        return <CloudFog className=" size-17 md:size-25 " />;
      case 51: // Light drizzle
      case 53: // Moderate drizzle
      case 55: // Dense drizzle
      case 56: // Freezing drizzle light
      case 57: // Freezing drizzle dense
        return <Umbrella className=" size-17 md:size-25 " />;
      case 61: // Slight rain
      case 63: // Moderate rain
      case 65: // Heavy rain
      case 66: // Light freezing rain
      case 67: // Heavy freezing rain
        return <CloudRain className=" size-17 md:size-25 " />;
      case 71: // Slight snow
      case 73: // Moderate snow
      case 75: // Heavy snow
      case 77: // Snow grains
        return <CloudSnow className=" size-17 md:size-25 " />;
      case 80: // Rain showers slight
      case 81: // Moderate rain showers
      case 82: // Violent rain showers
        return <CloudRain className=" size-17 md:size-25 " />;
      case 85: // Slight snow showers
      case 86: // Heavy snow showers
        return <CloudSnow className=" size-17 md:size-25 " />;
      case 95: // Thunderstorm slight or moderate
      case 96: // Thunderstorm with slight hail
      case 99: // Thunderstorm with heavy hail
        return <CloudLightning className=" size-17 md:size-25 " />;
      default:
        return <Cloud className=" size-17 md:size-25 " />;
    }
  };

  const weatherCodeToText = (code) => {
    switch (code) {
      case 0:
        return "Clear sky";
      case 1:
        return "Mainly clear";
      case 2:
        return "Partly cloudy";
      case 3:
        return "Overcast";
      case 45:
        return "Fog";
      case 48:
        return "Rime fog";
      case 51:
        return "Light drizzle";
      case 53:
        return "Moderate drizzle";
      case 55:
        return "Dense drizzle";
      case 56:
        return "Freezing drizzle (light)";
      case 57:
        return "Freezing drizzle (dense)";
      case 61:
        return "Slight rain";
      case 63:
        return "Moderate rain";
      case 65:
        return "Heavy rain";
      case 66:
        return "Light freezing rain";
      case 67:
        return "Heavy freezing rain";
      case 71:
        return "Slight snow";
      case 73:
        return "Moderate snow";
      case 75:
        return "Heavy snow";
      case 77:
        return "Snow grains";
      case 80:
        return "Rain showers";
      case 81:
        return "Moderate rain showers";
      case 82:
        return "Violent rain showers";
      case 85:
        return "Slight snow showers";
      case 86:
        return "Heavy snow showers";
      case 95:
        return "Thunderstorm";
      case 96:
        return "Thunderstorm w/ slight hail";
      case 99:
        return "Thunderstorm w/ heavy hail";
      default:
        return "Unknown";
    }
  };

  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track which card is in view
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const width = container.clientWidth;
      const index = Math.round(scrollLeft / width);
      setActiveIndex(index);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll when dot is clicked
  const scrollToIndex = (i) => {
    const container = scrollRef.current;
    if (!container) return;
    const width = container.clientWidth;
    container.scrollTo({
      left: i * width,
      behavior: "smooth",
    });
  };

  useGSAP(() => {
    gsap.fromTo(
      ".skeleton-d",
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

  if (error) {
    return null; // Results will show the error
  }

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 mb-20 relative">
      <span className="w-[85%] md:w-100 relative">
        <span className=" absolute w-full h-2 z-20 flex items-center justify-between top-3">
          <button
            className="shadow border-white border rounded-lg px-3 py-px hover:scale-105 cursor-pointer"
            onClick={() => {
              const newIndex = Math.max(activeIndex - 1, 0); // prevent going below 0
              setActiveIndex(newIndex);
              scrollToIndex(newIndex);
              if (activeIndex == 0) {
                setActiveIndex(6);
                scrollToIndex(6);
              }
            }}
          >
            <ArrowLeft />
          </button>
          <button
            className="shadow border-white border rounded-lg px-3 py-px hover:scale-105 cursor-pointer"
            onClick={() => {
              const newIndex = Math.min(activeIndex + 1, 6);
              setActiveIndex(newIndex);
              scrollToIndex(newIndex);
              if (activeIndex == 6) {
                setActiveIndex(0);
                scrollToIndex(0);
              }
            }}
          >
            <ArrowRight />
          </button>
        </span>
      </span>
      {/* Pagination dots */}
      <div className="flex w-full flex-row items-center justify-center gap-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            className={`w-5 h-1 rounded-full transition-all cursor-pointer z-20 ${activeIndex === i ? "bg-white scale-110" : "bg-gray-400"
              }`}
          />
        ))}
      </div>

      {/* Scrollable snap container */}
      <div
        ref={scrollRef}
        className="max-w-[85%] md:max-w-100 flex items-center justify-start 
                   overflow-x-auto flex-nowrap gap-4 
                   scroll-smooth snap-x snap-mandatory relative"
      >
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-gray to-white overflow-hidden 
                       min-w-[100%] md:min-w-100 px-6 py-6 rounded-md shadow 
                       flex flex-col items-start justify-center gap-6 
                       snap-center mt-4"
          >
            {(isLoading || isFetching) && (
              <div className="flex flex-col items-center justify-center w-full gap-4">
                <div className="flex items-center justify-center ">
                  <div className="w-22 h-6 rounded-lg bg-gray relative overflow-hidden">
                    <span className="h-60 w-6  bg-gradient-to-r from-white to-gray absolute -top-30 rotate-45 left-20 skeleton-d"></span>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full">
                  <div className="w-24 h-20 bg-gray rounded-lg overflow-hidden relative">
                    <span className="h-60 w-6  bg-gradient-to-r from-white to-gray absolute -top-30 rotate-45 left-20 skeleton-d"></span>
                  </div>
                  <div className="w-24 h-20 bg-gray rounded-lg overflow-hidden relative">
                    <span className="h-60 w-6  bg-gradient-to-r from-white to-gray absolute -top-30 rotate-45 left-20 skeleton-d"></span>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-24 h-22 bg-gray rounded-lg overflow-hidden relative">
                    <span className="h-60 w-6  bg-gradient-to-r from-white to-gray absolute -top-30 rotate-45 left-20 skeleton-d"></span>
                  </div>
                </div>
              </div>
            )}
            {!isFetching && !isLoading && !error && data?.daily && (
              <div className="flex flex-col items-center justify-center w-full gap-2">
                <div className="flex items-center justify-start">
                  <div className="text-sm opacity-70 border-white border shadow px-1 rounded-lg">
                    {new Date(data?.daily?.time?.[i]).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between w-full">
                  <div className=" flex flex-col items-center justify-between gap-2 text-2xl">
                    <span className="flex items-center justify-center gap-1">
                      Min{" "}
                      <Snowflake className="text-blue-500 mask-r-from-50%" />
                    </span>
                    <span className="  border-white border shadow px-1 rounded-lg">
                      {data?.daily?.temperature_2m_min?.[i]}
                    </span>
                  </div>
                  <div className=" flex flex-col items-center justify-between gap-2 text-2xl">
                    <span className="flex items-center justify-center gap-1">
                      Max <Sun className="text-red-500 mask-r-from-50%" />
                    </span>
                    <span className="border-white border shadow px-1 rounded-lg">
                      {data?.daily?.temperature_2m_max?.[i]}
                    </span>
                  </div>
                </div>
                <span className="flex flex-col items-center justify-center opacity-75  gap-2 md:gap-1 w-full">
                  {weatherCodeToIcon(data.daily?.weather_code?.[i])}
                  <span className="text-sm font-medium text-gray-600 border-white border shadow px-1 rounded-lg">
                    {weatherCodeToText(data.daily?.weather_code?.[i])}
                  </span>
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Daily;
