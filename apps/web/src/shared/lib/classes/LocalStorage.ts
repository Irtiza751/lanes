export class LocalStorage {
  public static getItem<T = unknown>(key: string, option?: { parse?: boolean }): T | null {
    const item = localStorage.getItem(key)
    if (item) {
      return option?.parse ? JSON.parse(item) : (item as T)
    }
    return null
  }
  public static setItem<T>(key: string, value: T): void {
    const item = typeof value === 'string' ? value : JSON.stringify(value)
    localStorage.setItem(key, item)
  }
}
