import { GameMode } from '@/config/gameMode';
import { LocalStorageKey } from '@/config/localStorageKey';
import { APIData } from '@/types/apiData';
import { LocalStorageRepository } from './localStorageRepository';
import { PlayerRole } from '@/config/playerRole';
import { PlayerTeam } from '@/config/playerTeam';

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

  export function setPlayingPlayerDataFromAPI(
    playerData: APIData.APIReplyPlayerData
  ) {
    LocalStorageRepository.set(
      LocalStorageKey.jrptPlayingPlayername,
      playerData.playerName
    );
    LocalStorageRepository.set(
      LocalStorageKey.jrptPlayingPlayericon,
      playerData.playerIcon
    );
    LocalStorageRepository.set(
      LocalStorageKey.jrptPlayingPlayerrole,
      playerData.playerRole
    );
    LocalStorageRepository.set(
      LocalStorageKey.jrptPlayingPlayerteam,
      playerData.playerTeam
    );
    LocalStorageRepository.set(
      LocalStorageKey.jrptPlayingPlayerstate,
      playerData.playerState
    );
    return;
  }

  export function setPlayingPlayerRole(playerRole: PlayerRole) {
    LocalStorageRepository.set(
      LocalStorageKey.jrptPlayingPlayerrole,
      playerRole
    );
    return;
  }

  export function setPlayingPlayerTeam(playerTeam: PlayerTeam) {
    LocalStorageRepository.set(
      LocalStorageKey.jrptPlayingPlayerteam,
      playerTeam
    );
    return;
  }
}
