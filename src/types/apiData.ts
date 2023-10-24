import { GameState } from '../config/gameState';

export namespace APIData {
  /**
   * ゲーム状態レスポンスAPIデータ
   */
  export type APIReplyGameState = {
    /** ゲーム状態 */
    gameState: GameState;
  };

  /**
   * デバイスID存在確認リクエストAPIデータ
   */
  export type APISendDeviceId = {
    /** 対象のデバイスID */
    deviceId: string;
  };

  /**
   * デバイスID存在確認レスポンスAPIデータ
   */
  export type APIReplyExistsDeviceId = {
    /** デバイスIDの存在確認結果（TRUE で存在） */
    exists: boolean;
  };

  /**
   * プレイヤー生存確認レスポンスAPIデータ
   */
  export type APIReplyCheckPlayerAlive = {
    /** プレイヤー生存確認結果（TRUE で生存） */
    isAlive: boolean;
  };
}
