import { GameMode } from '@/config/gameMode';
import { GameState } from '../config/gameState';
import { PlayerRole } from '@/config/playerRole';
import { PlayerState } from '@/config/playerState';
import { PlayerTeam } from '@/config/playerTeam';

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
    aliveStatus: boolean;
  };

  /**
   * 新規ゲーム情報リクエストAPIデータ
   */
  export type APISendNewGame = {
    /** 保存するゲームモード */
    gameMode: GameMode;
  };

  /**
   * 処理結果レスポンスAPIデータ
   */
  export type APIReplyProcessResult = {
    /** 保存した結果（TRUE で成功） */
    result: boolean;
  };

  /**
   * プレイヤーデータ APIデータ
   */
  export type APISendEntryPlayerData = {
    /** デバイスID */
    deviceId: string;
    /** プレイヤー名 */
    playerName: string;
    /** プレイヤーアイコン */
    playerIcon: string;
  };

  /**
   * プレイヤー名重複確認結果 APIデータ
   */
  export type APIReplyDuplicationResult = {
    /** 重複 */
    existsDuplicate: boolean;
  };

  /**
   * ゲーム状態 リクエスト APIデータ
   */
  export type APISendGameState = {
    /** ゲーム状態 */
    gameState: GameState;
  };

  /**
   * プレイヤーデータ レスポンス APIデータ
   */
  export type APIReplyPlayerData = {
    /** デバイスID */
    deviceId: string;
    /** プレイヤー名 */
    playerName: string;
    /** プレイヤーアイコン */
    playerIcon: string;
    /** 役職 */
    playerRole: PlayerRole;
    /** 所属チーム */
    playerTeam: PlayerTeam;
    /** プレイヤー状態 */
    playerState: PlayerState;
  };

  /**
   * 全プレイヤーデータ レスポンス APIデータ
   */
  export type APIReplyAllPlayerData = {
    /** 全プレイヤーデータ */
    allPlayerData: APIReplyPlayerData[];
  };
}
