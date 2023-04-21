<template>
  <section class="chart-section">
    <div ref="chartRef"></div>
  </section>
</template>

<script setup lang="ts">
import ApexCharts from 'apexcharts'
import { onMounted, ref } from 'vue';

const chartRef = ref(null)

const options = {
    series: [{
    name: 'series1',
    data: [31, 40, 28, 51, 42, 109, 100]
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
  xaxis: {
    type: 'datetime',
    categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm'
    },
  },
};


onMounted(() => {
  const chart = new ApexCharts(chartRef.value, options);
  chart.render();
})
</script>
