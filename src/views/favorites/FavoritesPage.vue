<template>
  <DayWeekSwitcher
    @clickDay="getDayForecast"
    @clickWeek="getWeekForecast"
  >
  </DayWeekSwitcher>
</template>

<script setup lang="ts">
import { getCurrentForecastForGroup } from '@/api/services';
import { localStorageWrapper } from '@/utils/Storage';
import { onMounted, ref } from 'vue';

const favoritesStorage = ref(localStorageWrapper.getItem<number[]>('favorites'))

const getGroupData = (citiesId: number[]) => {
  getCurrentForecastForGroup(citiesId.join(','))
    .then(res => console.log(res))
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