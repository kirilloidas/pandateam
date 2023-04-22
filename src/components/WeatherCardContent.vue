<template>
  <div class="content-block">
    <div class="content-block__info">
      <div class="content-block__info-item">
        <span class="content-block__info-label">Temperature:</span>
        <span class="content-block__info-value">{{ item.main.temp }}</span>
      </div>
      <div class="content-block__info-item">
        <span class="content-block__info-label">Range:</span>
        <span class="content-block__info-value">{{ item.main.temp_min }} - {{ item.main.temp_max }}</span>
      </div>
      <div class="content-block__info-item">
        <span class="content-block__info-label">Wind:</span>
        <span class="content-block__info-value">{{ item.wind.speed }}</span>
      </div>
      <div class="content-block__info-item">
        <span class="content-block__info-label">Pressure:</span>
        <span class="content-block__info-value">{{item. main.pressure }}</span>
      </div>
    </div>
    <div class="weather-card__icon">
      <img :src="'http://openweathermap.org/img/w/' + item.weather[0].icon + '.png'" :alt="item.weather[0].description">
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { IWeather } from '@/types/index';

interface IProps {
  item: IWeather
}
defineProps<IProps>()

</script>

<style lang="scss" scoped>
.content-block {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 20px;

    &-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }

    &-label {
      font-size: 16px;
      font-weight: bold;
    }

    &-value {
      font-size: 16px;
    }
  }
}
</style>