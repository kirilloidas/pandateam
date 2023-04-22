<template>
  <div class="carousel-wrapper">
    <ul class="carousel">
      <li 
        class="carousel__item"
        v-for="(item) of list"
        :key="item"
        @click="$emit('elementClick', item)"
      >
        <slot 
          name="item"
          :item="item"
        ></slot>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface IEmits {
  (e: 'elementClick', value: any): void;
}

defineProps<{list: any[]}>()
defineEmits<IEmits>()
</script>

<style lang="scss" scoped>
.carousel-wrapper {
  display: flex;

  .carousel {
    display: flex;
    align-items: center;
    overflow-x: scroll;
    width: 100%;
    height: 100%;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>