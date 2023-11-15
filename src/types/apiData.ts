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

  /**
   * 投票用プレイヤーデータ レスポンス APIデータ
   */
  export type APIReplyVotePlayerData = {
    /** 投票プレイヤーデバイスID */
    voterDeviceId: string;
    /** 投票プレイヤー名 */
    voterPlayerName: string;
    /** 投票プレイヤーID */
    voterPlayerIcon: string;
    /** 被投票プレイヤーデバイスID */
    receiverDeviceId: string;
    /** 被投票プレイヤー名 */
    receiverPlayerName: string;
    /** 被投票プレイヤーアイコン */
    receiverPlayerIcon: string;
  };

  /**
   * 全投票用プレイヤーデータ レスポンス APIデータ
   */
  export type APIReplyAllVotePlayerData = {
    /** 全プレイヤーデータ */
    allVotePlayerData: APIReplyVotePlayerData[];
  };

  /**
   * 投票用プレイヤーデータ レスポンス APIデータ
   */
  export type APISendVotePlayerData = {
    /** 投票プレイヤーデバイスID */
    voterDeviceId: string;
    /** 投票プレイヤー名 */
    voterPlayerName: string;
    /** 投票プレイヤーID */
    voterPlayerIcon: string;
    /** 被投票プレイヤーデバイスID */
    receiverDeviceId: string;
    /** 被投票プレイヤー名 */
    receiverPlayerName: string;
    /** 被投票プレイヤーアイコン */
    receiverPlayerIcon: string;
  };

  /**
   * 夜アクション用データ レスポンス APIデータ
   */
  export type APISendNightActionData = {
    /** デバイスID */
    deviceId: string;
    /** 対象プレイヤーのデバイスID */
    receiverDeviceId: string;
  };

  //
  // リクエスト・レスポンス共通
  //

  /**
   * プレイヤー基本データ APIデータ
   */
  export type APIPlayerBasicData = {
    /** デバイスID */
    deviceId: string;
    /** プレイヤー名 */
    playerName: string;
    /** プレイヤーアイコン */
    playerIcon: string;
  };

  /**
   * 複数プレイヤー基本データ APIデータ
   */
  export type APIMultiPlayerBasicData = {
    /** すべてのデータ */
    allData: APIPlayerBasicData[];
  };

  /**
   * 勝利チーム APIデータ
   */
  export type APIWinningTeam = {
    /** 勝利チーム */
    winningTeam: PlayerTeam;
  };
}
