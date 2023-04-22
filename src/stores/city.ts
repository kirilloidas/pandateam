import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { ICity, ICityWeather, IHourlyWeather } from '@/types'
import {
  getCurrentForecast, getHourlyForecast, getCurrentForecastByGeo
} from '@/api/services'
import { useModalStore } from './modal'
import type { AxiosResponse } from 'axios'

interface IDataResponse {
  list: IHourlyWeather[];
  [key: string]: unknown;
}

export const useCitiesStore = defineStore('city', () => {
  const cities: Ref<ICityWeather[]> = ref([])
  const currentCity: Ref<ICityWeather | null> = ref(null)
  const hourlyDataForCurrentCity: Ref<IHourlyWeather[]> = ref([])

  const modalStore = useModalStore()

  const getHourlyData = (cityId: number) => {
    getHourlyForecast(cityId)
      .then((res: AxiosResponse<IDataResponse>) => {
        hourlyDataForCurrentCity.value = res.data.list
      })
  }

  const addCity = (getFunc: () => Promise<AxiosResponse<ICityWeather>>) => {
    getFunc()
      .then((res: AxiosResponse<ICityWeather>) => {
        setCurrentCity(res.data)
        cities.value.push(res.data)
      })
  }

  const isContain = (id: number | undefined) => {
    return cities.value.some(el => el.id === id)
  }

  const addCityHandler = ({ getFunc, cityId }: { getFunc: () => Promise<any>, cityId?: number }) => {
    if (isContain(cityId)) {
      return modalStore.setModalMsg('Этот город уже добавлен')
    }
    if (cities.value.length < 5) {
      return addCity(getFunc)
    }
    modalStore.setModalMsg('Невозможно добавить новый город. Максимальное количество - 5')
  }

  const removeCity = (id: number) => {
    cities.value = cities.value.filter(el => el.id !== id)
  }

  const removeCityHandler = (city: ICityWeather) => {
    if (cities.value.length > 1) {
      removeCity(city.id)
      return setCurrentCity(cities.value[0])
    }
    modalStore.setModalMsg('Должен быть хотя бы один город')
  }

  const setCurrentCity = (city: ICityWeather) => {
    currentCity.value = city
    getHourlyData(city.id)
  }

  return {
    cities,
    currentCity,
    addCityHandler,
    setCurrentCity,
    hourlyDataForCurrentCity,
    removeCityHandler,
  }
})
