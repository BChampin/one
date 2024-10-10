'use client';

import BookmarkCard from '@/modules/bookmark/BookmarkComponents'
import WeatherCard from '@/modules/weather/WeatherComponents'

export default function HomePage() {
  return (
    <div>
      <div className="row my-4">
        <BookmarkCard />
      </div>
      <div className="grid grid-cols-12 gap-2 my-4">
        <div className="col-span-6">
          <WeatherCard />
        </div>
      </div>
    </div>
  )
}
