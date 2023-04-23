<template>
  <div>
    <header class="header">
      <img alt="Vue logo" class="header__logo" src="@/assets/img/logo.png" />

      <nav class="header-menu menu">
        <RouterLink class="menu__link" to="/">Главная</RouterLink>
        <RouterLink class="menu__link" to="/favorite">Избранное</RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>

    <ModalComponent/>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import ModalComponent from './components/ModalComponent.vue';
import { useGeolocation } from '@/composables/useGeolocation'
import { useCitiesStore } from '@/stores/city'
import { getCurrentForecastByGeo } from '@/api/services'
import { watch } from 'vue'

const {latitude, longitude} = useGeolocation()
const { addCityHandler } = useCitiesStore()

watch(
  () => [latitude, longitude],
  () => {
    if(latitude.value && longitude.value) {
      addCityHandler({
        getFunc: () => getCurrentForecastByGeo({lat: latitude.value, lon: longitude.value}), 
      })
    }
  },
  { deep: true }
)
</script>

<style scoped lang="scss">
.header {
  line-height: 1.5;
  max-height: 100vh;
  display: flex;
  flex-direction: column;

  &__logo {
    display: block;
    width: 300px;
    margin: 0 auto 2rem;
  }

  .menu {
    width: 100%;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 0;
    gap: 20px;

    &__link {
      display: inline-block;
      padding: 0.5rem 1rem;
      background-color: #007bff;
      color: #fff;
      text-decoration: none;
      border-radius: 0.25rem;
      transition: background-color 0.2s ease-in-out;

      &:hover {
        background-color: #0069d9;
      }

      &.router-link-exact-active {
        background-color: #0062cc;
        outline: none;

        &:hover {
          background-color: #60adff;
        }
      }
    }
  }
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);

    &__logo {
      margin: 0 2rem 0 0;
    }
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
