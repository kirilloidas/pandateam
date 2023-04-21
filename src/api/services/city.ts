import { api } from ".."

export const getCities = (cityName: string) => {
  return api().get(`/data/2.5/find?q=${cityName}&type=like&sort=population&appid=${import.meta.env.VITE_WEATHERMAP_KEY}`)
}