export interface PluginOptions {
  cityLabel: string | undefined
  cityUrl: string | undefined
  latitude: number | undefined
  longitude: number | undefined
  timezone: string | undefined
}

// https://open-meteo.com/en/docs
interface WeatherType {
  codes: number[]
  svg: string
  label: string
}

export const WEATHER_CODES : Array<WeatherType> = [
  { codes: [0], svg: 'sunny', label: 'Clear sky' },
  { codes: [1, 2, 3], svg: 'sunny_light_cloud', label: 'Mainly clear, partly cloudy, and overcast' },
  { codes: [45, 48], svg: 'fog', label: 'Fog and depositing rime fog' },
  { codes: [51, 53, 55], svg: 'light_rain', label: 'Drizzle: Light, moderate, and dense intensity' },
  { codes: [56, 57], svg: 'ice_rain', label: 'Freezing Drizzle: Light and dense intensity' },
  { codes: [61, 63, 65], svg: 'heavy_rain', label: 'Rain: Slight, moderate and heavy intensity' },
  { codes: [66, 67], svg: 'ice_rain', label: 'Freezing Rain: Light and heavy intensity' },
  { codes: [71, 73, 75], svg: 'snow', label: 'Snow fall: Slight, moderate, and heavy intensity' },
  { codes: [77], svg: 'snow', label: 'Snow grains' },
  { codes: [80, 81, 82], svg: 'very_heavy_rain', label: 'Rain showers: Slight, moderate, and violent' },
  { codes: [85, 86], svg: 'very_heavy_rain', label: 'Snow showers slight and heavy' },
  { codes: [95], svg: 'thunderstorm', label: 'Thunderstorm: Slight or moderate' },
  { codes: [96, 99], svg: 'cyclon', label: 'Thunderstorm with slight and heavy hail' }
]
