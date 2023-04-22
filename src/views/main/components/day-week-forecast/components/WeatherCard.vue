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
.weather-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 300px;
  margin: 10px;

  .header-block {
    margin-bottom: 20px;

    &__title {
      font-size: 24px;
      font-weight: bold;
      margin: 0;
    }

    &__subtitle {
      font-size: 18px;
      margin: 5px 0 0;
    }
  }

  &__icon {
    width: 80px;

    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>