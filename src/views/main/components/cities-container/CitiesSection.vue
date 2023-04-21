<template>
  <section class="cities-container">
    <CarouselVue
      :list="cities"
      @elementClick="setCurrentCity"
    >
      <template #item="{item}">
        <CityCard
          :item="item"
        />
      </template>
    </CarouselVue>
  </section>
</template>

<script setup lang="ts">
import CarouselVue from '@/components/Carousel.vue';
import { useCitiesStore } from '@/stores/city'
import CityCard from './components/CityCard.vue';

const { cities, setCurrentCity } = useCitiesStore()
</script>

<style lang="scss" scoped>
.cities-container {
  padding: 10px;
}
</style>