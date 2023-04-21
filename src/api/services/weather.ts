import { api } from ".."

export const getHourlyForecast = (cityId: number) => {
  // return api().get(`https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${import.meta.env.WEATHERMAP_KEY}&units=metric`)
  // return api().get(`https://pro.openweathermap.org/data/2.5/forecast/hourly?id=${cityId}&appid=${import.meta.env.VITE_WEATHERMAP_KEY}`)

  return api().get(`https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&units=metric&appid=${import.meta.env.VITE_WEATHERMAP_KEY}`)
  // return api().get(`https://api.openweathermap.org/data/2.5/onecall?lat=44.34&lon=10.99&exclude=daily,minutely,alerts&appid=${import.meta.env.VITE_WEATHERMAP_KEY}`)
}

export const getCurrentForecast = (cityId: number) => {
  return api().get(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&appid=${import.meta.env.VITE_WEATHERMAP_KEY}`)
}

export const getCurrentForecastForGroup = (citiesId: string) => {
  return api().get(`https://api.openweathermap.org/data/2.5/group?id=${citiesId}&units=metric&appid=${import.meta.env.VITE_WEATHERMAP_KEY}`)
}

// export const getHistoryHourlyForecast = ({ cityId, start, end }: { cityId: number; start: number; end: number }) => {
//   return api().get(`https://history.openweathermap.org/data/2.5/history/city?id=${cityId}&type=hour&start=${start}&end=${end}&units=metric&appid=${import.meta.env.VITE_WEATHERMAP_KEY}`)
// }