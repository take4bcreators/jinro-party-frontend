/** WebSocketでリクエストするアクション名 */
export const WsRequestAction = {
  /** 未設定 */
  Empty: 'Empty',
  /** アクションなし（デバッグ用） */
  NoAction: 'NoAction',
  /** ゲーム状態更新 */
  GameStateUpdate: 'GameStateUpdate',
  /** ゲーム画面変更 */
  GameScreenChange: 'GameScreenChange',
  /** タイマー状態変更 */
  TimerStateChange: 'TimerStateChange',
  /** ゲーム状態確認 */
  ReturnCurrentGameState: 'ReturnCurrentGameState',
  /** エントリープレイヤー数 */
  ReturnEntryPlayerCount: 'ReturnEntryPlayerCount',
  /** 投票テーブル変更 */
  VoteTableChange: 'VoteTableChange',
} as const;
export type WsRequestAction =
  (typeof WsRequestAction)[keyof typeof WsRequestAction];
