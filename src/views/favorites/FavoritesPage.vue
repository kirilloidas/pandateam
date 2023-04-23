<template>
  <DayWeekSwitcher
    @clickDay="getDayForecast"
    @clickWeek="getWeekForecast"
  >
    <FavoriteCity
      v-for="item of favoriteCities"
      :key="item.city.id"
      :item="item"
      @removeFromFavorites="removeFromFavorites"
    />
  </DayWeekSwitcher>
</template>

<script setup lang="ts">
import { getHourlyForecast } from '@/api/services';
import DayWeekSwitcher from '@/components/DayWeekSwitcher.vue';
import type { IHourlyWeather } from '@/types';
import type { AxiosResponse } from 'axios';
import { onMounted, ref, type Ref } from 'vue';
import FavoriteCity from './components/FavoriteCity.vue';
import { useFavorite } from '@/composables/useFavorite';
import { getCurrentDayForecast } from '@/utils/getCurrentDayForecast';

interface IResponse {
  city: {
    name: string;
    country: string;
    id: number;
  };
  list: IHourlyWeather[];
}

const {favoritesStorage, removeFavorite} = useFavorite()

const favoriteCities: Ref<IResponse[]> = ref([])
const initialFavoriteCities: Ref<IResponse[]> = ref([])

const getGroupData = async (citiesId: number[]) => {
  const func = (cityId: number) => getHourlyForecast(cityId)

  return Promise.allSettled(citiesId.map(func))
    .then(res => res.forEach((element) => {
      if(element.status === 'fulfilled') {
        const value = element.value as AxiosResponse<IResponse>
        favoriteCities.value.push(value.data)
        initialFavoriteCities.value.push(value.data)
      }
    }))
}

const removeFromFavorites = (id: number) => {
  removeFavorite(id)
  initialFavoriteCities.value = initialFavoriteCities.value.filter(el => el.city.id !== id)
  favoriteCities.value = favoriteCities.value.filter(el => el.city.id !== id)
}

const getDayForecast = () => {
  favoriteCities.value = JSON.parse(JSON.stringify(initialFavoriteCities.value)).map((el: IResponse) => {
    el.list = getCurrentDayForecast(el.list.map(item => {
      item.dt_txt = item.dt_txt.split(' ')[1]
      return item
    }))
    return el
  })
}

const getWeekForecast = () => {
  favoriteCities.value = JSON.parse(JSON.stringify(initialFavoriteCities.value))
}

onMounted(() => {
  if(favoritesStorage.value) {
    getGroupData(favoritesStorage.value)
      .then(getDayForecast)
  }
})
</script>