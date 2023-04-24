<template>
  <section class="favorite-section">
    <div class="favorite-section__header header">
      <h4 class="header__name ellipsis">{{ item.city.name }}</h4>
      <button class="favorite-section__btn" @click="$emit('removeFromFavorites', item.city.id)">
        <i class="fa fa-star"></i>
        Удалить из Избранного
      </button>
    </div>

    <CarouselComponent
      :list="item.list"
    >
      <template #item="{item}: { item: IHourlyWeather}">
        <WeatherCard
          :item="item"
        />
      </template>
    </CarouselComponent>
  </section>
</template>

<script setup lang="ts">
import CarouselComponent from '@/components/CarouselComponent.vue';
import WeatherCard from '@/components/WeatherCard.vue';
import type { IHourlyWeather } from '@/types';

interface IProps {
  item: {
    city: {
      name: string;
      country: string;
      id: number;
    };
    list: IHourlyWeather[];
  }
}
interface IEmits {
  (e: 'removeFromFavorites', value: number): void
}
defineProps<IProps>()
defineEmits<IEmits>()
</script>

<style lang="scss" scoped>
.favorite-section {
  margin-top: 30px;

  .header {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    &__name {
      font-size: 24px;
      font-weight: bold;
      margin: 0;
    }
  }

  &__icon {
    width: 80px;

    img {
      width: 100%;
      height: auto;
    }
  }

  &__btn {
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