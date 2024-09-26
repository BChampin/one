import { createContext, useContext } from 'react';
import { WeatherContextType } from './types'

const WeatherContext = createContext<WeatherContextType | null>(null);

const useWeatherContext = () => {
  const weatherState = useContext(WeatherContext);

  if (!weatherState) {
    throw new Error('WeatherContext must be used within a WeatherProvider');
  }

  return {
    ...weatherState,
  };
};

export { WeatherContext, useWeatherContext };
