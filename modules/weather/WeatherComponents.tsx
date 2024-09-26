import { useWeatherContext } from './WeatherContext'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Divider,
} from '@nextui-org/react'
import { WeatherDay, WeatherSvgsMap } from './types'
import Image from 'next/image'

export default function WeatherCard () {
  const { weatherConfig, weatherData, readWeather } = useWeatherContext()

  const handleWeatherReadClick = async () => { await readWeather() }

  return (
    <Card>
      <CardHeader>
        <div className="w-full flex items-center justify-between">
          <h4 className='mr-6'>
            Weather card
          </h4>
          <Button onClick={handleWeatherReadClick}>Reload</Button>
        </div>
      </CardHeader>
      <CardBody>
        <div className="w-full flex items-center justify-between">
          <div className="flex items-baseline">
            <div className="flex items-baseline mr-3">
              <div className="text-xl mr-2">
                { weatherConfig.cityLabel }
              </div>
              <div className="ml-2 text-sm">
                { new Date().toLocaleDateString('en-EN', { weekday: "long", year: 'numeric', month: 'long', day: 'numeric', }) }
              </div>
            </div>
            {weatherConfig.cityUrl &&
              <a
                href={weatherConfig.cityUrl}
                target="_blank"
                className="text-primary"
              >
                <Image
                  src={WeatherSvgsMap['newTab']}
                  width={20}
                  height={20}
                  alt="Open in new tab"
                />
              </a>
            }
            {/* <div className="cursor-pointer" @click="weatherStore.refresh()">
              <img
                src="./svg/reload.svg"
                style="height:1rem;"
              />
            </div> */}
            <div
              className='cursor-pointer mx-2'
              onClick={handleWeatherReadClick}
            >
              <Image
                src={WeatherSvgsMap['reload']}
                width={18}
                height={18}
                alt="Reload"
              />
            </div>
          </div>
          <div>
            <span className="text-lg">
              { weatherData.today?.tempNow }°
            </span>
          </div>
        </div>
        {
          weatherData.today &&
          <div className="w-full flex items-center justify-between">
            {/* <img
              v-if="weatherData.today?.svg"
              :src="`/_nuxt/plugins/weather/svg/${weatherData.today?.svg}.svg`"
              :alt="weatherData.today?.svg"
              className="mr-sm"
              style="height:5em;"
            > */}
            <Image
              src={WeatherSvgsMap[weatherData.today.svg]}
              width={40}
              height={40}
              alt="Today weather icon"
            />
            <div className="flex-col justify-evenly text-right">
              <div className="text-xl font-bold">
                <span className="text-sky-400">
                  { weatherData.today.tempMin }°
                </span>
                -
                <span className="text-red-400">
                  { weatherData.today.tempMax }°
                </span>
              </div>
              <div className="font-normal">
                { weatherData.today.weather }
              </div>
            </div>
          </div>
        }

        <Divider />

        {weatherData.nextDays &&
          <div
            className="mt-4 flex justify-around"
          >
            {
              weatherData.nextDays.map((nextDay: WeatherDay, index: number) => (
                <div
                  key={index}
                  className="flex flex-col items-center"
                >
                  <div className="font-bold">
                    { nextDay.label }
                  </div>
                  <div>
                    {/* <img
                      v-if="nextDay.svg"
                      :src="`/_nuxt/plugins/weather/svg/${nextDay.svg}.svg`"
                      :alt="nextDay.svg"
                      :title="nextDay.weather"
                      style="height:2.6em;"
                    > */}
                    <Image
                      src={WeatherSvgsMap[nextDay.svg]}
                      width={40}
                      height={40}
                      alt="Day weather icon"
                    />
                  </div>
                  <div>
                    <span className="font-bold text-sky-400">
                      { nextDay.tempMin }°
                    </span>
                    -
                    <span className="font-bold text-red-400">
                      { nextDay.tempMax }°
                    </span>
                  </div>
                </div>
              ))
            }
          </div>
        }
      </CardBody>
    </Card>
  )
}
