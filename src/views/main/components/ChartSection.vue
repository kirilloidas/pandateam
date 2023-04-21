<template>
  <section class="chart-section">
    <div ref="chartRef"></div>
  </section>
</template>

<script setup lang="ts">
import { getHourlyForecast } from '@/api/services';
import { useCitiesStore } from '@/stores/city';
import ApexCharts from 'apexcharts'
import type { AxiosResponse } from 'axios';
import { onMounted, ref, watch } from 'vue';

interface IHourlyData {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
  };
  [key: string]: unknown;
}

interface IDataResponse {
  list: IHourlyData[];
  [key: string]: unknown;
}

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

const getCurrentDayInterval = () => {
  const currentDate = new Date();

  const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);

  const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59);

  return {
    startOfDayTimestamp: startOfDay.getTime() / 1000,
    endOfDayTimestamp: endOfDay.getTime() / 1000
  }
}

const getCurrentData = (list: IHourlyData[]) => {
  const { 
    startOfDayTimestamp,
    endOfDayTimestamp
  } = getCurrentDayInterval()

  return list.filter(el => el.dt >= startOfDayTimestamp && el.dt <= endOfDayTimestamp)
}

const getDataForChart = (cityId: number) => {
  getHourlyForecast(cityId)
    .then((res: AxiosResponse<IDataResponse>) => {
      const currentdata = getCurrentData(res.data.list)
      updateChart(currentdata.map(el => ({
        x: el.dt_txt.split(' ')[1],
        y: el.main.temp
      })))
    })
}

const initChart = () => {
  chart.value = new ApexCharts(chartRef.value, options)
  chart.value.render()
}

watch(
  () => citiesStore.currentCity,
  (newValue) => {
    if(newValue) {
      getDataForChart(newValue.id)
    }
  },
  {
    deep: true
  }
)

onMounted(initChart)
</script>
