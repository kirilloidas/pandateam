type StorageItem<T> = T extends object ? T : string | number | boolean | null;

class StorageWrapper {
  private storage: Storage

  constructor(storage: Storage) {
    this.storage = storage
  }

  getItem<T>(key: string): StorageItem<T> | null {
    const item = this.storage.getItem(key)

    if (item === null) {
      return null
    }

    try {
      return JSON.parse(item) as StorageItem<T>
    } catch (err) {
      return item as StorageItem<T>
    }
  }

  setItem<T>(key: string, value: T): void {
    const item = typeof value !== 'string' ? JSON.stringify(value) : value

    this.storage.setItem(key, item)
  }

  removeItem(key: string): void {
    this.storage.removeItem(key)
  }

  clear(): void {
    this.storage.clear()
  }
}

export const localStorageWrapper = new StorageWrapper(window.localStorage)
export const sessionStorageWrapper = new StorageWrapper(window.sessionStorage)