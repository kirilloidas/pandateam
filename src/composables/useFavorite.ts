import { useModalStore } from "@/stores/modal"
import { localStorageWrapper } from "@/utils/Storage"
import { computed, ref } from "vue"

export const useFavorite = <T extends { id: number }>(item?: T) => {
  const modalStore = useModalStore()

  const favoritesStorage = ref(localStorageWrapper.getItem<number[]>('favorites'))

  const isFavorite = computed(() => favoritesStorage.value?.some(id => id === item?.id))

  const addFavorite = (item: T) => {
    if (favoritesStorage.value && favoritesStorage.value?.length >= 5) {
      modalStore.setModalMsg('Невозможно добавить новый город. Максимальное количество - 5')
      return favoritesStorage.value
    }
    let newFavorites = []
    if (favoritesStorage.value && favoritesStorage.value.some(id => id !== item.id)) {
      newFavorites = [...favoritesStorage.value, item.id]
    } else {
      newFavorites = [item.id]
    }

    localStorageWrapper.setItem<number[]>('favorites', newFavorites)
    return newFavorites
  }

  const removeFavorite = (id: number) => {
    const newFavorites = favoritesStorage.value?.filter(item => item !== id) ?? []
    localStorageWrapper.setItem<number[]>('favorites', newFavorites)
    return newFavorites
  }

  const toggleAddToFavorite = (item: T) => {
    if (isFavorite.value) {
      return favoritesStorage.value = removeFavorite(item.id)
    }
    favoritesStorage.value = addFavorite(item)
  }

  return {
    favoritesStorage,
    isFavorite,
    toggleAddToFavorite,
    removeFavorite,
  }
}