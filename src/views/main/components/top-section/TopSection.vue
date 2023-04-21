<template>
  <section class="top-section">
    <DropdownList
      :model-value="citySearch"
      :itemLabel="getItemLabel"
      :items="cityItems"
      @update:value="changeCitySearch"
      @select="selectCity"
    />
  </section>
</template>

<script setup lang="ts">
import DropdownList from '@/components/dropdownList/DropdownList.vue'
import {getCities} from '@/api/services'
import {useDebounce} from '@/utils/useDebounce'
import { ref, type Ref } from 'vue'
import type { AxiosResponse } from 'axios';
import type { ICity } from '@/types/city';
import { useCitiesStore } from '@/stores/city';

interface ICitiesResponse {
  list: {
    id: number;
    name: string;
    sys: {
      country: string;
    };
  }[];
}

const { addCity } = useCitiesStore()

const citySearch = ref('')
const cityItems: Ref<ICity[]> = ref([])

const getItemLabel = (value: ICity) => {
  return `${value.name}, ${value.country}`
}

const selectCity = (city: ICity) => {
  addCity(city)
}

const changeCitySearch = useDebounce((value: string) => {
  getCities(value)
    .then((res: AxiosResponse<ICitiesResponse>) => {
      cityItems.value = res.data.list.map(city => ({
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
  justify-content: center;
  align-items: center;
}
</style>