<template>
  <div class="weather-card">
    <div class="weather-card__header">
      <h2 class="weather-card__title">{{ item.name }}, {{ item.sys.country }}</h2>
      <h3 class="weather-card__subtitle">{{  item.weather[0].main }}</h3>
    </div>
    <div class="weather-card__content">
      <div class="weather-card__info">
        <div class="weather-card__info-item">
          <span class="weather-card__info-label">Temperature:</span>
          <span class="weather-card__info-value">{{ item.main.temp }}</span>
        </div>
        <div class="weather-card__info-item">
          <span class="weather-card__info-label">Range:</span>
          <span class="weather-card__info-value">{{ item.main.temp_min }} - {{ item.main.temp_max }}</span>
        </div>
        <div class="weather-card__info-item">
          <span class="weather-card__info-label">Wind:</span>
          <span class="weather-card__info-value">{{ item.wind.speed }}</span>
        </div>
        <div class="weather-card__info-item">
          <span class="weather-card__info-label">Pressure:</span>
          <span class="weather-card__info-value">{{item. main.pressure }}</span>
        </div>
      </div>
      <div class="weather-card__icon">
        <img :src="'http://openweathermap.org/img/w/' + item.weather[0].icon + '.png'" :alt="item.weather[0].description">
      </div>
    </div>

    <button class="weather-card__button favorite-btn">
      <i class="fa fa-star"></i>
      В Избранное
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface IProps {
  item: {
    name: string;
    sys: {
      country: string;
    };
    main: {
      temp: number;
      temp_max: number;
      temp_min: number;
      pressure: number;
    };
    wind: {
      speed: number;
    };
    weather: {
      description: string;
      icon: string;
      main: string;
    }[];
  }
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
  cursor: pointer;

  &__header {
    margin-bottom: 20px;
  }

  &__title {
    font-size: 24px;
    font-weight: bold;
    margin: 0;
  }

  &__subtitle {
    font-size: 18px;
    margin: 5px 0 0;
  }

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

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

  &__icon {
    width: 80px;

    img {
      width: 100%;
      height: auto;
    }
  }

  .favorite-btn {
    display: inline-block;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    line-height: 1;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    background-color: #f44336;
    color: #fff;

    &:hover {
      background-color: #e53935;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.4);
    }
  }
}
</style>