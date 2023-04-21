import { api } from ".."

export const getHourlyForecast = (cityId: number) => {
  // return api().get(`https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${import.meta.env.WEATHERMAP_KEY}&units=metric`)
  return api().get(`https://pro.openweathermap.org/data/2.5/forecast/hourly?id=${cityId}&appid=${import.meta.env.VITE_WEATHERMAP_KEY}`)
}

export const getCurrentForecast = (cityId: number) => {
  return api().get(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&appid=${import.meta.env.VITE_WEATHERMAP_KEY}`)
}

export const getCurrentForecastForGroup = (citiesId: string) => {
  return api().get(`https://api.openweathermap.org/data/2.5/group?id=${citiesId}&units=metric&appid=${import.meta.env.VITE_WEATHERMAP_KEY}`)
}