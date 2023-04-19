import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useErrorStore = defineStore('error', () => {
  const errorMsg = ref('')

  const setErrorMsg = (msg: string) => {
    errorMsg.value = msg
  }

  const clearErrorMsg = () => {
    errorMsg.value = ''
  }

  return { errorMsg, setErrorMsg, clearErrorMsg }
})
