import { localStorageWrapper } from "@/utils/Storage"
import { computed, ref } from "vue"

export const useFavorite = (item) => {
  const favoritesStorage = ref(localStorageWrapper.getItem<number[]>('favorites'))

  const isFavorite = computed(() => favoritesStorage.value?.some(id => id === item.id))

  const addFavorite = () => {
    let newFavorites = []
    if (favoritesStorage.value && favoritesStorage.value.some(id => id !== item.id)) {
      newFavorites = [...favoritesStorage.value, item.id]
    } else {
      newFavorites = [item.id]
    }

    localStorageWrapper.setItem<number[]>('favorites', newFavorites)
    return newFavorites
  }

  const removeFavorite = () => {
    const newFavorites = favoritesStorage.value?.filter(id => id !== item.id) ?? []
    localStorageWrapper.setItem<number[]>('favorites', newFavorites)
    return newFavorites
  }

  const toggleAddToFavorite = () => {
    console.log(isFavorite.value, item)
    if (isFavorite.value) {
      console.log(removeFavorite())
      return favoritesStorage.value = removeFavorite()
    }
    favoritesStorage.value = addFavorite()
  }

  return {
    isFavorite,
    toggleAddToFavorite,
    removeFavorite,
  }
}