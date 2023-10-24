import { LocalStorageKey } from '@/config/localStorageKey';
import { LocalStorageService } from './localStorageService';
import { v4 as uuidv4 } from 'uuid';
import { APIData } from '@/types/apiData';

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
      const uuid = uuidv4();
      LocalStorageService.set(LocalStorageKey.jrptGeneralDeviceid, uuid);
    }
    return;
  }

  export function getIfExists(): string | undefined {
    const deviceId = LocalStorageService.get(
      LocalStorageKey.jrptGeneralDeviceid
    );
    return deviceId;
  }

  export function get(): string {
    registerIfNotExists();
    const deviceId = getIfExists() ?? '';
    return deviceId;
  }

  export function getIfExistsToAPIData(): APIData.APISendDeviceId {
    const deviceId = getIfExists() ?? '';
    const apiData: APIData.APISendDeviceId = {
      deviceId: deviceId,
    };
    return apiData;
  }

  export function getToAPIData(): APIData.APISendDeviceId {
    const deviceId = get();
    const apiData: APIData.APISendDeviceId = {
      deviceId: deviceId,
    };
    return apiData;
  }
}
