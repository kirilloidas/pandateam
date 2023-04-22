import { useModalStore } from "@/stores/modal";
import { ref } from "vue";

export const useGeolocation = () => {

  const modalStore = useModalStore()

  const latitude = ref()
  const longitude = ref()

  const success = (position: GeolocationPosition) => {
    latitude.value = position.coords.latitude;
    longitude.value = position.coords.longitude;
  }

  const error = () => {
    modalStore.setModalMsg('Невозможно получить ваше местоположение')
  }

  if (!navigator.geolocation) {
    modalStore.setModalMsg('Geolocation не поддерживается вашим браузером')
  } else {
    console.log('Определение местоположения…')
    navigator.geolocation.getCurrentPosition(success, error)
  }

  return {
    latitude,
    longitude
  }
}