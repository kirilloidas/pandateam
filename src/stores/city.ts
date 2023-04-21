import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { ICity, ICityWeather } from '@/types/city'
import {
  getHourlyForecast,
  getCurrentForecast
} from '@/api/services'
import type { AxiosResponse } from 'axios'

export const useCitiesStore = defineStore('city', () => {
  const cities: Ref<ICityWeather[]> = ref([])
  const currentCity: Ref<ICityWeather | null> = ref(null)

  const hourlyForecast = ref()

  const addCity = (city: ICity) => {
    currentForecast(city.id)
    // cities.value.push(city)
  }

  const removeCity = (id: number) => {
    cities.value = cities.value.filter(el => el.id !== id)
  }

  const getHourlyForecastForCurrentCity = (cityId: number) => {
    getHourlyForecast(cityId)
      .then(res => {
        console.log(res)
        hourlyForecast.value = res.data
      })
  }

  const setCurrentCity = (city: ICityWeather) => {
    currentCity.value = city
    getHourlyForecastForCurrentCity(city.id)
  }

  const currentForecast = (cityId: number) => {
    getCurrentForecast(cityId)
      .then((res: AxiosResponse<ICityWeather>) => {
        currentCity.value = res.data
        cities.value.push(res.data)
      })
  }

  return {
    cities,
    currentCity,
    addCity,
    removeCity,
    setCurrentCity,
    hourlyForecast,
  }
})
