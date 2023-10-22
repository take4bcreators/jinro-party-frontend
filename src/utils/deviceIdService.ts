import { LocalStorageKey } from '@/config/localStorageKey';
import { LocalStorageService } from './localStorageService';

export namespace DeviceIdService {
  /**
   * デバイスIDの確認と生成
   * @returns なし
   */
  export function registerIfNotExists(): void {
    const deviceId = LocalStorageService.get(
      LocalStorageKey.jrptGeneralDeviceid
    );
    if (deviceId == undefined) {
      const uuid = crypto.randomUUID();
      LocalStorageService.set(LocalStorageKey.jrptGeneralDeviceid, uuid);
    }
    return;
  }

  export function getIfExists(): string {
    const deviceId = LocalStorageService.get(
      LocalStorageKey.jrptGeneralDeviceid
    );
    return deviceId ?? '';
  }

  export function get(): string {
    registerIfNotExists();
    const deviceId = getIfExists();
    return deviceId;
  }
}
