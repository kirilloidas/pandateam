<template>
  <div class="modal" v-if="modalStore.modalMsg">
    <div class="modal__overlay" @click="modalStore.clearModalMsg"></div>
    <div class="modal__content">
      <p>{{ modalStore.modalMsg }}</p>
      <button @click="modalStore.clearModalMsg">Закрыть</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from '@/stores/modal'

const modalStore = useModalStore()
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  &__content {
    background-color: white;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
    text-align: center;

    & button {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.25rem;
      background-color: #007aff;
      color: white;
      font-size: 1rem;
      cursor: pointer;
    }
  }
}
</style>