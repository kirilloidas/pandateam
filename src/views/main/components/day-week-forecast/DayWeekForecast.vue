<template>
  <DayWeekSwitcher
    @clickDay="getDayForecast"
    @clickWeek="getWeekForecast"
  >
    <Carousel
      :list="forecast"
    >
      <template #item="{item}: { item: IHourlyWeather}">
        <WeatherCard
          :item="item"
          :key="item.dt"
        />
      </template>
    </Carousel>
  </DayWeekSwitcher>
</template>

<script setup lang="ts">
import Carousel from '@/components/CarouselComponent.vue';
import WeatherCard from './components/WeatherCard.vue'
import { useCitiesStore } from '@/stores/city'
import type { IHourlyWeather } from '@/types/index';
import { ref, watch, type Ref } from 'vue';
import { getCurrentDayForecast } from '@/utils/getCurrentDayForecast';
import DayWeekSwitcher from '@/components/DayWeekSwitcher.vue';

const citiesStore = useCitiesStore()

const forecast: Ref<IHourlyWeather[]> = ref([])

const getDayForecast = () => {
  forecast.value = getCurrentDayForecast(citiesStore.hourlyDataForCurrentCity.reduce((acc, el) => {
    acc.push({
      ...el,
      dt_txt: el.dt_txt.split(' ')[1]
    })
    return acc
  }, [] as IHourlyWeather[]))
  console.log(forecast.value)
}

const getWeekForecast = () => {
  forecast.value = citiesStore.hourlyDataForCurrentCity
}

watch(
  () => citiesStore.hourlyDataForCurrentCity,
  getDayForecast,
)

</script>