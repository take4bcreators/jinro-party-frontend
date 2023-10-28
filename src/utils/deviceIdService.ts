import { LocalStorageService } from './localStorageService';
import { v4 as uuidv4 } from 'uuid';
import { APIData } from '@/types/apiData';

export namespace DeviceIdService {
  export function registerIfNotExists(): void {
    const deviceId = LocalStorageService.getDeviceId();
    if (deviceId == undefined) {
      const uuid = uuidv4();
      LocalStorageService.setDeviceId(uuid);
    }
    return;
  }

  function getIfExists(): string | undefined {
    const deviceId = LocalStorageService.getDeviceId();
    return deviceId;
  }

  export function get(): string {
    registerIfNotExists();
    const deviceId = getIfExists() ?? '';
    return deviceId;
  }

  export function getToAPIData(): APIData.APISendDeviceId {
    const deviceId = get();
    const apiData: APIData.APISendDeviceId = {
      deviceId: deviceId,
    };
    return apiData;
  }
}
