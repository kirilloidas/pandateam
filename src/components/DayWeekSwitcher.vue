<template>
  <section class="forecast-block">

    <div class="forecast-block__btns btns">
      <button 
        class="btns__btn" 
        :class="{active: period === 'day'}"
        @click="getDayForecast"
      >
        День
      </button>

      <button 
        class="btns__btn" 
        :class="{active: period === 'week'}"
        @click="getWeekForecast"
      >
        5 дней
      </button>
    </div>

    <slot></slot>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface IEmits {
  (e: 'clickDay'): void;
  (e: 'clickWeek'): void;
}

const emit = defineEmits<IEmits>()

const period = ref('day')

const getDayForecast = () => {
  period.value = 'day'
  emit('clickDay')
}

const getWeekForecast = () => {
  period.value = 'week'
  emit('clickWeek')
}
</script>

<style lang="scss" scoped>
.forecast-block {
  .btns {
    gap: 5px;
    display: flex;

    &__btn {
      width: 100px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
      border-radius: 4px;

      &.active {
        background: orange;
      }
    }
  }
}
</style>