/** WebSocket宛先 */
export const WsDestinationType = {
  /** バックエンドサーバーを含めたすべて */
  All: 'All',
  /** バックエンドサーバー向け */
  Server: 'Server',
  /** 各サイト向け */
  AllSite: 'AllSite',
  /** ゲームマスターサイト向け */
  GameMasterSite: 'GameMasterSite',
  /** モニターサイト向け */
  MonitorSite: 'MonitorSite',
  /** プレイヤーサイト向け */
  PlayerSite: 'PlayerSite',
  /** 特定のプレイヤー向け */
  Player: 'Player',
} as const;
export type WsDestinationType =
  (typeof WsDestinationType)[keyof typeof WsDestinationType];
