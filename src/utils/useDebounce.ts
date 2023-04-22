import { ref } from "vue"

export const useDebounce = (callback: Function, delay = 500) => {
  const debounceTimeout = ref<number | null>(null)

  return (...args: any[]) => {
    if (debounceTimeout.value) {
      clearTimeout(debounceTimeout.value)
    }
    debounceTimeout.value = setTimeout(() => {
      callback(...args)
      debounceTimeout.value = null
    }, delay)
  }
}