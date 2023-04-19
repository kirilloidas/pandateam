<template>
  <section class="top-section">
    <DropdownList
      :model-value="citySearch"
      :items="cityItems"
      @update:value="changeCitySearch"
    />

    <button class="top-section__button favorite-btn">
      <i class="fa fa-star"></i>
      В Избранное
    </button>
  </section>
</template>

<script setup lang="ts">
import DropdownList from '@/components/dropdownList/DropdownList.vue'
import {getCities} from '@/api/services'
import {useDebounce} from '@/utils/useDebounce'
import { ref } from 'vue'

const citySearch = ref('')
const cityItems = ref([])

const changeCitySearch = useDebounce((value: string) => {
  getCities(value)
    .then(res => {
      cityItems.value = res.data.list.map((city: {id: number; name: string; sys: {country: string;}}) => ({
        id: city.id,
        name: city.name,
        country: city.sys.country,
      }))
    })
})
</script>

<style lang="scss" scoped>
.top-section {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .favorite-btn {
    display: inline-block;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    line-height: 1;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    background-color: #f44336;
    color: #fff;

    &:hover {
      background-color: #e53935;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.4);
    }
  }
}
</style>