import { SessionStorageKey } from '@/config/sessionStorageKey';

export namespace SessionStorageRepository {
  export function get(key: SessionStorageKey): string | undefined {
    const storageItem = sessionStorage.getItem(key);
    if (storageItem == null) {
      return undefined;
    }
    return storageItem;
  }

  export function set(key: SessionStorageKey, value: string): void {
    sessionStorage.setItem(key, value);
    return;
  }
}
