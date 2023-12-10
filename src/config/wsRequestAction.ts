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
  /** カウントダウンタイマー開始 */
  CountdownTimerStart: 'CountdownTimerStart',
  /** カウントダウンタイマー一時停止 */
  CountdownTimerPause: 'CountdownTimerPause',
  /** カウントダウンタイマー再開 */
  CountdownTimerResume: 'CountdownTimerResume',
  /** ゲーム状態確認 */
  ReturnCurrentGameState: 'ReturnCurrentGameState',
  /** エントリープレイヤー数 */
  ReturnEntryPlayerCount: 'ReturnEntryPlayerCount',
} as const;
export type WsRequestAction =
  (typeof WsRequestAction)[keyof typeof WsRequestAction];
