<template>
  <section class="cities-container">
    <CarouselVue
      :list="citiesStore.cities"
      @elementClick="citiesStore.setCurrentCity"
    >
      <template #item="{item}: { item: ICityWeather}">
        <CityCard
          :class="{active: item.id === citiesStore.currentCity?.id}"
          :item="item"
        />
      </template>
    </CarouselVue>
  </section>
</template>

<script setup lang="ts">
import CarouselVue from '@/components/CarouselComponent.vue'
import { useCitiesStore } from '@/stores/city'
import CityCard from './components/CityCard.vue'
import type { ICityWeather } from '@/types';

const citiesStore = useCitiesStore()

</script>