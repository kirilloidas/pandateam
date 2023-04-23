<template>
  <div 
    class="weather-card"
    :class="{favorite: isFavorite}"
  >
    <div class="weather-card__header header-block">
      <h2 class="header-block__title">{{ item.name }}, {{ item.sys.country }}</h2>
      <h3 class="header-block__subtitle">{{  item.weather[0].main }}</h3>
    </div>

    <WeatherCardContent
      :item="item"
    />

    <div class="weather-card__btns btns-block">
      <button class="btns-block__button" @click="toggleAddToFavorite(item)">
        <i class="fa fa-star"></i>
        {{isFavorite ? 'Удалить из Избранного' : 'В Избранное'}}
      </button>

      <button class="btns-block__button" @click="remove">
        <i class="fa fa-star"></i>
        Удалить
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

import type { ICityWeather } from '@/types/index';
import { useCitiesStore } from '@/stores/city'
import WeatherCardContent from '@/components/WeatherCardContent.vue';
import { useFavorite } from '@/composables/useFavorite'

interface IProps {
  item: ICityWeather
}

const props = defineProps<IProps>()

const citiesStore = useCitiesStore()
const {isFavorite, toggleAddToFavorite} = useFavorite(props.item)

const remove = () => {
  citiesStore.removeCityHandler(props.item)
}

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
  opacity: 0.7;

  &.favorite {
    border: 4px solid orange;
  }

  &.active {
    opacity: 1;
  }

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

  .btns-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 5px;

    &__button {
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
}

@media (max-width: 1024px) {
  .weather-card {
    padding: 10px;
    width: 250px;
    margin: 10px;

    .header-block {
      margin-bottom: 10px;

      &__title {
        font-size: 20px;
      }

      &__subtitle {
        font-size: 14px;
      }
    }

    &__icon {
      width: 50px;
    }

    .btns-block {

      &__button {
        padding: 5px 10px;
        font-size: 12px;
      }
    }
  }
}
</style>