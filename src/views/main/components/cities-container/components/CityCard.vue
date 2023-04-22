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
      <button class="btns-block__button" @click="toggleAddToFavorite">
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
import { computed, defineProps, ref } from 'vue'

import type { ICityWeather } from '@/types/index';
import { localStorageWrapper } from '@/utils/Storage';
import { useCitiesStore } from '@/stores/city'
import WeatherCardContent from '@/components/WeatherCardContent.vue';

interface IProps {
  item: ICityWeather
}

const props = defineProps<IProps>()

const citiesStore = useCitiesStore()

const favoritesStorage = ref(localStorageWrapper.getItem<number[]>('favorites'))

const isFavorite = computed(() => favoritesStorage.value?.some(id => id === props.item.id))

const addToFavorite = () => {
  let newFavorites = []
  if(favoritesStorage.value && favoritesStorage.value.some(id => id !== props.item.id)) {
    newFavorites = [...favoritesStorage.value, props.item.id]
  } else {
    newFavorites = [props.item.id]
  }

  localStorageWrapper.setItem<number[]>('favorites', newFavorites)
  favoritesStorage.value = newFavorites
}

const toggleAddToFavorite = () => {
  if(isFavorite.value) {
    const newFavorites = favoritesStorage.value?.filter(id => id !== props.item.id) ?? []
    localStorageWrapper.setItem<number[]>('favorites', newFavorites)
    return favoritesStorage.value = newFavorites
  }
  addToFavorite()
}

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
</style>