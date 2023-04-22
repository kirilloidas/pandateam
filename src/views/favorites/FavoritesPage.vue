<template>
  <DayWeekSwitcher
    @clickDay="getDayForecast"
    @clickWeek="getWeekForecast"
  >
    <FavoriteCity
      v-for="item of favoriteCities"
      :key="item.city.id"
      :item="item"
    />
  </DayWeekSwitcher>
</template>

<script setup lang="ts">
import { getHourlyForecast } from '@/api/services';
import DayWeekSwitcher from '@/components/DayWeekSwitcher.vue';
import type { IHourlyWeather } from '@/types';
import { localStorageWrapper } from '@/utils/Storage';
import type { AxiosResponse } from 'axios';
import { onMounted, ref, type Ref } from 'vue';
import FavoriteCity from './components/FavoriteCity.vue';

interface IResponse {
  city: {
    name: string;
    country: string;
    id: number;
  };
  list: IHourlyWeather[];
}

const favoritesStorage = ref(localStorageWrapper.getItem<number[]>('favorites') ?? [])
const favoriteCities: Ref<IResponse[]> = ref([])

const getGroupData = (citiesId: number[]) => {
  const func = (cityId: number) => getHourlyForecast(cityId)

  Promise.allSettled(citiesId.map(func))
    .then(res => res.forEach((element) => {
      if(element.status === 'fulfilled') {
        const value = element.value as AxiosResponse<IResponse>
        favoriteCities.value.push(value.data)
      }
    }))
}

const getDayForecast = () => {

}

const getWeekForecast = () => {

}

onMounted(() => {
  if(favoritesStorage.value) {
    getGroupData(favoritesStorage.value)
  }
})
</script>