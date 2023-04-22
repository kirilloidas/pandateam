import { useModalStore } from "@/stores/modal"
import { localStorageWrapper } from "@/utils/Storage"
import { computed, ref } from "vue"

export const useFavorite = (item) => {
  const modalStore = useModalStore()

  const favoritesStorage = ref(localStorageWrapper.getItem<number[]>('favorites'))

  const isFavorite = computed(() => favoritesStorage.value?.some(id => id === item?.id))

  const addFavorite = (item) => {
    if (favoritesStorage.value && favoritesStorage.value?.length >= 5) {
      return modalStore.setModalMsg('Невозможно добавить новый город. Максимальное количество - 5')
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

  const removeFavorite = (item) => {
    const newFavorites = favoritesStorage.value?.filter(id => id !== item.id) ?? []
    localStorageWrapper.setItem<number[]>('favorites', newFavorites)
    return newFavorites
  }

  const toggleAddToFavorite = (item) => {
    if (isFavorite.value) {
      return favoritesStorage.value = removeFavorite(item)
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