import { api } from ".."

export const getCities = (cityName: string) => {
  return api().get(`/data/2.5/find?q=${cityName}&type=like&sort=population&appid=b352df7456cbd31cf07f70660e3eb572`)
}