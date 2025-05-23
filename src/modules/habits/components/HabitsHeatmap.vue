<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  year: number
  start?: Date
  end?: Date
}

const props = withDefaults(defineProps<Props>(), {
  year: 2025,
  start: undefined,
  end: undefined
})


const EMPTY_SQUARE = 'empty'
const DAYS_IN_WEEK = 7
const BASE_SQUARE_SIZE = 10
const SQUARE_BORDER_SIZE = BASE_SQUARE_SIZE / 5
const SQUARE_SIZE = BASE_SQUARE_SIZE + SQUARE_BORDER_SIZE
const LEFT_SECTION_WIDTH = Math.ceil(BASE_SQUARE_SIZE * 2.5)
const TOP_SECTION_HEIGHT = BASE_SQUARE_SIZE + (BASE_SQUARE_SIZE / 2)

// Dates - helpers
const chunk = <T>(arr: T[] = [], chunkSize = 1, cache: T[][] = []): T[][] => {
  const tmp = [...arr]
  if (chunkSize <= 0) return cache
  while (tmp.length) cache.push(tmp.splice(0, chunkSize))
  return cache
}
const getCountEmptyDaysAtStart = (startDate: Date) => { return startDate.getDay() }
const lo = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  on: 'on',
  less: 'Less',
  more: 'More'
}

// Dates
const yearDates = computed(() => {
  const dates = []
  const start = props.start ?? new Date(props.year, 0, 1)
  const end = props.end ?? new Date(props.year, 11, 31)
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    dates.push({
      date: new Date(d),
      fill: 'green'
    })
  }
  for (let index = 0; index < getCountEmptyDaysAtStart(start); index++) {
    dates.unshift(EMPTY_SQUARE)
  }
  return dates
})
const weeks = computed(() => { return chunk(yearDates.value, 7) })
const monthsLabels = computed(() => {
  const months = []
  for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
    months.push({
      label: lo.months[monthIndex],
      offset: weeks.value.findIndex(week => week.map(date => date !== EMPTY_SQUARE && typeof date === 'object' ? date.date.getMonth() : -1).includes(monthIndex))
    })
  }
  return months
})

// UI
function getWeekPosition (index: number) { return `translate(${index * SQUARE_SIZE}, 0)` }
function getDayPosition (index: number) { return `translate(0, ${index * SQUARE_SIZE})` }
const viewbox = computed(() => { return `0 0 ${LEFT_SECTION_WIDTH + (SQUARE_SIZE * weeks.value.length) + SQUARE_BORDER_SIZE} ${TOP_SECTION_HEIGHT + (SQUARE_SIZE * DAYS_IN_WEEK)}` })
</script>

<template>
  <div>
    <svg
      class="w-full my-2 vch__wrapper"
      :viewBox="viewbox"
    >
      <g
        class="vch__months__labels__wrapper"
        :transform="`translate(${LEFT_SECTION_WIDTH}, 0)`"
      >
        <text
          v-for="(month, i) in monthsLabels"
          :key="i"
          class="text-[10px]"
          :x="SQUARE_SIZE * month.offset"
          :y="BASE_SQUARE_SIZE"
        >
          {{ month.label }}
        </text>
      </g>
      <g :transform="`translate(0, ${TOP_SECTION_HEIGHT})`">
        <text
          class="text-[10px]"
          :x="0"
          :y="20"
        >
          {{ lo.days[ 1 ] }}
        </text>
        <text
          class="text-[10px]"
          :x="0"
          :y="44"
        >
          {{ lo.days[ 3 ] }}
        </text>
        <text
          class="text-[10px]"
          :x="0"
          :y="69"
        >
          {{ lo.days[ 5 ] }}
        </text>
      </g>
      <g
        class="vch__year__wrapper"
        transform="translate(25, 15)"
      >
        <g
          v-for="(week, weekIndex) of weeks"
          :key="weekIndex"
          :transform="getWeekPosition(weekIndex)"
        >
          <template
            v-for="(day, dayIndex) of week"
            :key="dayIndex"
          >
            <rect
              v-if="day !== EMPTY_SQUARE && typeof day === 'object'"
              :rx="SQUARE_BORDER_SIZE"
              :ry="SQUARE_BORDER_SIZE"
              :transform="getDayPosition(dayIndex)"
              :width="BASE_SQUARE_SIZE"
              :height="BASE_SQUARE_SIZE"
              class="vch__day__square"
              :style="`fill: ${day.fill}`"
            />
          </template>
        </g>
      </g>
    </svg>
  </div>
</template>

<style>
  svg.vch__wrapper {
    rect.vch__day__square:hover {
      stroke: #555;
      stroke-width: 2px;
      paint-order: stroke;
    }
    rect.vch__day__square:focus {
      outline: none;
    }
  }
</style>
