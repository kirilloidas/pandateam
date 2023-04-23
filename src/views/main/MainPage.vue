<template>
  <div class="main-page">
    <TopSection/>
    <CitiesSection/>
    <DayWeekForecast/>
    <ChartSection/>
  </div>
</template>

<script setup lang="ts">
import TopSection from './components/TopSection.vue'
import ChartSection from './components/ChartSection.vue'
import CitiesSection from './components/cities-container/CitiesSection.vue';
import DayWeekForecast from './components/DayWeekForecast.vue';
</script>