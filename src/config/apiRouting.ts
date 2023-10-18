export namespace APIRouting {
  /** APIのルーティング */
  export const Point = {
    /** GET: ゲーム状態取得 */
    getGameState: 'api/get-game-state',
    /** POST: デバイスIDの存在確認 */
    postExistsDeviceId: 'api/post-exists-device-id',
    /** POST: プレイヤー生存確認 */
    postCheckPlayerAlive: 'api/post-check-player-alive',
  } as const;
  export type Point = (typeof Point)[keyof typeof Point];
}
