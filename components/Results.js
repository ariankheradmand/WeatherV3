"use client";

import { useWeatherForecast } from "@/hooks/use-weather";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
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
} from "lucide-react";
import React from "react";

function Results({ latitude, longitude, cityName }) {
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
        return <CloudRain className=" size-17 md:size-25 "/>;
      case 85: // Slight snow showers
      case 86: // Heavy snow showers
        return <CloudSnow className=" size-17 md:size-25 "/>;
      case 95: // Thunderstorm slight or moderate
      case 96: // Thunderstorm with slight hail
      case 99: // Thunderstorm with heavy hail
        return <CloudLightning className=" size-17 md:size-25 "/>;
      default:
        return <Cloud className=" size-17 md:size-25 "/>;
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
      className="bg-gradient-to-br relative from-gray overflow-hidden min-h-[256px]  w-[85%] md:w-100 to-white px-6 py-6 rounded-md shadow flex flex-col items-start justify-center gap-6"
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
          <span className=" flex items-center justify-center size-25 opacity-75 bg-gray overflow-hidden">
            <div className="w-full h-full relative">
              <span className="h-60 w-6  bg-gradient-to-r from-white to-gray absolute -top-30 rotate-45 left-20 skeleton-r"></span>
            </div>
          </span>
        </div>
      )}
      {!isFetching && !isLoading && !error && (
        <div className="flex flex-col items-center justify-center w-full gap-4 py-2">
          
          <div className="flex items-center justify-between w-full">
            <div className="text-3xl mask-b-from-50% font-bold  mask-b-from-zinc-400">
              {cityName}
            </div>
            <div className="text-2xl mask-b-from-50% font-bold mask-b-from-zinc-400">
              {data.current.temperature_2m} °C
            </div>
          </div>
          <div className="flex  items-center justify-between w-full">
            <div className="flex items-center justify-center gap-2 opacity-70 border-white border shadow px-1 rounded-lg">
              {data.current.wind_speed_10m+ " Km/h"}
              <Wind />
            </div>
            <div className="flex items-center justify-center gap-2 opacity-70 border-white border shadow px-1 rounded-lg">
              {data.current.relative_humidity_2m + "%"}
              <Droplet />
            </div>
          </div>
          <span className="flex flex-col items-center justify-center opacity-75  gap-2 md:gap-0 ">
            {weatherCodeToIcon(data.current.weather_code)}
            <span className="text-sm font-medium text-gray-600 border-white border shadow px-1 rounded-lg">
              {weatherCodeToText(data.current.weather_code)}
            </span>
          </span>
        </div>
      )}
    </div>
  );
}

export default Results;
