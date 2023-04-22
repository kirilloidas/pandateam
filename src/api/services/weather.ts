import { api } from ".."

export const getHourlyForecast = (cityId: number) => {
  return api().get(`https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&units=metric&appid=${import.meta.env.VITE_WEATHERMAP_KEY}`)
}

export const getCurrentForecast = (cityId: number) => {
  return api().get(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&appid=${import.meta.env.VITE_WEATHERMAP_KEY}`)
}

export const getCurrentForecastForGroup = (citiesId: string) => {
  return api().get(`https://api.openweathermap.org/data/2.5/group?id=${citiesId}&units=metric&appid=${import.meta.env.VITE_WEATHERMAP_KEY}`)
}

export const getCurrentForecastByGeo = ({ lat, lon }: { lat: number; lon: number }) => {
  return api().get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_WEATHERMAP_KEY}`)
}

// export const getHistoryHourlyForecast = ({ cityId, start, end }: { cityId: number; start: number; end: number }) => {
//   return api().get(`https://history.openweathermap.org/data/2.5/history/city?id=${cityId}&type=hour&start=${start}&end=${end}&units=metric&appid=${import.meta.env.VITE_WEATHERMAP_KEY}`)
// }