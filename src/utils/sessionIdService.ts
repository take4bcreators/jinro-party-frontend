import { v4 as uuidv4 } from 'uuid';
import { SessionStorageService } from './sessionStorageService';

export namespace SessionIdService {
  export function registerIfNotExists(): void {
    const sessionId = SessionStorageService.getSessionId();
    if (sessionId == undefined) {
      const uuid = uuidv4();
      SessionStorageService.setSessionId(uuid);
    }
    return;
  }

  function getIfExists(): string | undefined {
    const sessionId = SessionStorageService.getSessionId();
    return sessionId;
  }

  export function get(): string {
    registerIfNotExists();
    const sessionId = getIfExists() ?? '';
    return sessionId;
  }
}
