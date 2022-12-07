class CacheData {
  storage: Storage
  constructor(type: Storage) {
    this.storage = type === localStorage ? localStorage : sessionStorage
  }

  setCache(key: string, val: any) {
    if (val) {
      this.storage.setItem(key, JSON.stringify(val))
    }
  }

  getCache(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  removeCache(key: string) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}

const localCache = new CacheData(localStorage)
const sessionCache = new CacheData(sessionStorage)

export { localCache, sessionCache }
