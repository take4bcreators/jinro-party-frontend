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
  } as const;
  export type Point = (typeof Point)[keyof typeof Point];
}
