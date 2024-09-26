'use client';

import React, { useContext, useEffect, useState } from 'react';
import { WeatherContext } from './WeatherContext';
import { WeatherModuleOptions, WeatherContextType, WEATHER_CODES } from './types'

interface WeatherProviderProps {
  children: React.ReactNode;
}

const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [weatherConfig, setWeatherConfig] = useState<WeatherModuleOptions>({
    cityLabel: process.env.NEXT_PUBLIC_WEATHER_CITY_LABEL || undefined,
    cityUrl: process.env.NEXT_PUBLIC_WEATHER_CITY_URL || undefined,
    latitude: Number(process.env.NEXT_PUBLIC_WEATHER_LATITUDE) || undefined,
    longitude: Number(process.env.NEXT_PUBLIC_WEATHER_LONGITUDE) || undefined,
    timezone: process.env.NEXT_PUBLIC_WEATHER_TIMEZONE || undefined,
  });
  const [weatherData, setWeatherData] = useState<WeatherContextType[]>([]);


  const readWeather = async () => {
    const rq = await fetch(
      'https://api.open-meteo.com/v1/forecast?' + new URLSearchParams({
        latitude: weatherConfig.latitude,
        longitude: weatherConfig.longitude,
        current: 'temperature_2m',
        daily: 'weather_code,temperature_2m_max,temperature_2m_min',
        timezone: weatherConfig.timezone,
        forecast_days: 4
      })
    ).then((res) => res.json())
    console.log(rq)

    // formattedData to return
    const days = []
    if (!Object.keys(rq).length) return { city: weatherConfig.cityLabel }
    for (let index = 0; index <= 3; index++) {
      const dailyData = rq?.daily
      const weatherCode = WEATHER_CODES.find(wc => wc.codes.includes(dailyData.weather_code[index]))
      days.push({
        tempMin: dailyData.temperature_2m_min[index],
        tempMax: dailyData.temperature_2m_max[index],
        svg: weatherCode.svg,
        weather: weatherCode.label,
        label: new Date(dailyData.time[index]).toLocaleDateString('en-EN', { weekday: 'short' })
      })
    }
    Object.assign(days[0], { tempNow: rq.current.temperature_2m })
    // days[0].currentTemp = get(weatherData.value, 'daily')

    return {
      city: weatherConfig.cityLabel,
      today: days[0],
      nextDays: days.slice(1),
      // timestamp: undefined
    }
    return rq
  }

  useEffect(() => {
    const fetchWeather = async () => {
      setWeatherData(await readWeather())
    };
    fetchWeather();
  }, [weatherConfig]);

  return (
    <WeatherContext.Provider value={{
      weatherConfig,
      weatherData,
      readWeather
    }}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
