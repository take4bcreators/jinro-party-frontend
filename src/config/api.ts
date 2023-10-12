import type { GameState } from '@/config/game';

export namespace ApiRouting {
  /** APIのルーティング */
  export const Point = {
    /** ゲーム状態取得(GET) */
    getGameState: 'api/game-state',
    /** デバイスIDの存在確認(POST) */
    postExistsDeviceId: 'api/exists-device-id',
  } as const;
  export type Point = (typeof Point)[keyof typeof Point];
}

export namespace ApiData {
  /** ゲーム状態レスポンスAPIデータ */
  export type GameStateAPIRequest = {
    gameState: GameState;
  };

  /** デバイスID存在確認リクエストAPIデータ */
  export type DeviceIdAPIRequest = {
    deviceId: string;
  };

  /** デバイスID存在確認レスポンスAPIデータ */
  export type DeviceIdAPIResponse = {
    exists: boolean;
  };
}
