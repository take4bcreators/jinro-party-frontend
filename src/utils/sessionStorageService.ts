import { SessionStorageKey } from '@/config/sessionStorageKey';
import { SessionStorageRepository } from './sessionStorageRepository';

export namespace SessionStorageService {
  export function getSessionId(): string | undefined {
    const sessionId = SessionStorageRepository.get(
      SessionStorageKey.jrptGeneralSessionid
    );
    return sessionId;
  }

  export function setSessionId(sessionId: string) {
    SessionStorageRepository.set(
      SessionStorageKey.jrptGeneralSessionid,
      sessionId
    );
    return;
  }
}
