import { GameMode } from '@/config/gameMode';
import { LocalStorageKey } from '@/config/localStorageKey';
import { APIData } from '@/types/apiData';
import { LocalStorageRepository } from './localStorageRepository';

export namespace LocalStorageService {
  export function getDeviceId(): string | undefined {
    const deviceId = LocalStorageRepository.get(
      LocalStorageKey.jrptGeneralDeviceid
    );
    return deviceId;
  }

  export function setDeviceId(deviceId: string) {
    LocalStorageRepository.set(LocalStorageKey.jrptGeneralDeviceid, deviceId);
    return;
  }

  export function getNewGameMode(): GameMode {
    const mode = LocalStorageRepository.get(
      LocalStorageKey.jrptNewgameMode
    ) as GameMode;
    return mode;
  }

  export function getForPostNewGameMode(): APIData.APISendNewGame {
    const GameMode = LocalStorageRepository.get(
      LocalStorageKey.jrptNewgameMode
    ) as GameMode;
    const apiData: APIData.APISendNewGame = {
      gameMode: GameMode,
    };
    return apiData;
  }

  export function setNewGameMode(gameMode: GameMode) {
    const gameModeStr: string = gameMode;
    LocalStorageRepository.set(LocalStorageKey.jrptNewgameMode, gameModeStr);
    return;
  }

  export function getEntryPlayerName(): string | undefined {
    const name = LocalStorageRepository.get(
      LocalStorageKey.jrptEntryPlayername
    );
    return name;
  }

  export function setEntryPlayerName(name: string) {
    LocalStorageRepository.set(LocalStorageKey.jrptEntryPlayername, name);
    return;
  }

  export function getEntryPlayerIcon(): string | undefined {
    const icon = LocalStorageRepository.get(
      LocalStorageKey.jrptEntryPlayericon
    );
    return icon;
  }

  export function setEntryPlayerIcon(icon: string) {
    LocalStorageRepository.set(LocalStorageKey.jrptEntryPlayericon, icon);
    return;
  }
}
