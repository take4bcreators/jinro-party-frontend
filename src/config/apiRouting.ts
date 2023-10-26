export namespace APIRouting {
  /** APIのルーティング */
  export const Point = {
    /** WebSocket */
    WebSocket: '/api/ws',
    /** GET: ゲーム状態取得 */
    GetGameState: '/api/get-game-state',
    /** POST: デバイスIDの存在確認 */
    PostExistsDeviceId: '/api/post-exists-device-id',
    /** POST: プレイヤー生存確認 */
    PostCheckPlayerAlive: '/api/post-check-player-alive',
    /** POST: 新規ゲーム情報保存 */
    PostSaveNewGame: '/api/post-save-new-game',
    /** POST: エントリー用デバイスIDの存在確認 */
    PostExistsEntryDeviceId: '/api/post-exists-entry-device-id',
    /** POST: エントリー用プレイヤー名重複確認 */
    PostCheckDuplEntryPlayerName: '/api/post-check-dupl-entry-player-name',
    /** POST: エントリー用プレイヤーデータ仮登録 */
    PostPlayerTempRegist: '/api/post-player-temp-regist',
    /** POST: エントリー用プレイヤーデータ登録 */
    PostPlayerRegist: '/api/post-player-regist',
    /** POST: エントリー用プレイヤーデータ削除 */
    PostPlayerRegistRemove: '/api/post-player-regist-remove',
    /** GET: エントリーデータ本登録実行 */
    GetExecEntryRegist: '/api/get-exec-entry-regist',
  } as const;
  export type Point = (typeof Point)[keyof typeof Point];
}
