import { LocalStorageKey } from '@/config/localStorageKey';

export namespace LocalStorageRepository {
  export function get(key: LocalStorageKey): string | undefined {
    const storageItem = localStorage.getItem(key);
    if (storageItem == null) {
      return undefined;
    }
    return storageItem;
  }

  export function set(key: LocalStorageKey, value: string): void {
    localStorage.setItem(key, value);
    return;
  }
}
