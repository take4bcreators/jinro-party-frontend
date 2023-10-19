/** WebSocket送信元 */
export const WsSenderType = {
  /** バックエンドサーバー */
  Server: 'Server',
  /** ゲームマスターサイト */
  GameMasterSite: 'GameMasterSite',
  /** モニターサイト */
  MonitorSite: 'MonitorSite',
  /** プレイヤーサイト */
  PlayerSite: 'PlayerSite',
} as const;
export type WsSenderType = (typeof WsSenderType)[keyof typeof WsSenderType];
