<template>
  <div 
    class="weather-card"
  >
    <div class="weather-card__header header-block">
      <h2 class="header-block__title">{{ item.dt_txt }}</h2>
      <h3 class="header-block__subtitle">{{  item.weather[0].main }}</h3>
    </div>

    <WeatherCardContent
      :item="item"
    />
  </div>
</template>

<script setup lang="ts">
import WeatherCardContent from '@/components/WeatherCardContent.vue';
import type { IHourlyWeather } from '@/types/index';

interface IProps {
  item: IHourlyWeather
}

defineProps<IProps>()
</script>

<style lang="scss" scoped>
@import '@/assets/card-styles.scss';
</style>