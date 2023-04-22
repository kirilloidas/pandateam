import type { IHourlyWeather } from "@/types"
import { getCurrentDayInterval } from "./getCurrentDayInterval"

export const getCurrentDayForecast = (list: IHourlyWeather[]) => {
  const {
    startOfDayTimestamp,
    endOfDayTimestamp
  } = getCurrentDayInterval()

  return list.filter(el => el.dt >= startOfDayTimestamp && el.dt <= endOfDayTimestamp)
}