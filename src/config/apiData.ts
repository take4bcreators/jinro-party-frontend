import { GameState } from './gameState';

export namespace APIData {
  /** ゲーム状態レスポンスAPIデータ */
  export type APIReplyGameState = {
    gameState: GameState;
  };

  /** デバイスID存在確認リクエストAPIデータ */
  export type APISendDeviceId = {
    deviceId: string;
  };

  /** デバイスID存在確認レスポンスAPIデータ */
  export type APIReplyExistsDeviceId = {
    exists: boolean;
  };

  /** プレイヤー生存確認レスポンスAPIデータ */
  export type APIReplyCheckPlayerAlive = {
    isAlive: boolean;
  };
}
