<template>
  <section class="chart-section">
    <div ref="chartRef"></div>
  </section>
</template>

<script setup lang="ts">
import { useCitiesStore } from '@/stores/city';
import ApexCharts from 'apexcharts'
import { onMounted, ref, watch } from 'vue'
import { getCurrentDayForecast } from '@/utils/getCurrentDayForecast'

import type { IHourlyWeather } from '@/types/index';

const citiesStore = useCitiesStore()

const chartRef = ref()
const chart = ref()

const options = {
    series: [{
    name: 'temperature',
    data: []
  }],
    chart: {
    height: 350,
    type: 'area'
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  tooltip: {
    x: {
      format: 'HH:mm:ss'
    },
  },
};

const updateChart = (newData: {x: string; y: number}[]) => {
  chart.value.updateSeries([
    {
      data: newData,
    },
  ]);
}

const getDataForChart = (list: IHourlyWeather[]) => {
  const currentdata = getCurrentDayForecast(list)
    updateChart(currentdata.map(el => ({
      x: el.dt_txt.split(' ')[1],
      y: el.main.temp
    })))
}

const initChart = () => {
  chart.value = new ApexCharts(chartRef.value, options)
  chart.value.render()
}

watch(
  () => citiesStore.hourlyDataForCurrentCity,
  (newValue) => {
    if(newValue) {
      return getDataForChart(newValue)
    }
    updateChart([])
  },
  {
    deep: true
  }
)

onMounted(initChart)
</script>
