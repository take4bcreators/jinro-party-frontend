/** localStorageのキー */
export const LocalStorageKey = {
  /** デバイスID */
  jrptGeneralDeviceid: 'jrpt_general_deviceid',
  /** モード */
  jrptNewgameMode: 'jrpt_newgame_mode',
  /** エントリー時プレイヤー名 */
  jrptEntryPlayername: 'jrpt_entry_playername',
  /** エントリー時プレイヤーアイコン */
  jrptEntryPlayericon: 'jrpt_entry_playericon',
  /** プレイヤー名 */
  jrptPlayingPlayername: 'jrpt_playing_playername',
  /** プレイヤーアイコン */
  jrptPlayingPlayericon: 'jrpt_playing_playericon',
  /** 役職 */
  jrptPlayingPlayerrole: 'jrpt_playing_playerrole',
  /** 所属チーム */
  jrptPlayingPlayerteam: 'jrpt_playing_playerteam',
  /** プレイヤー状態 */
  jrptPlayingPlayerstate: 'jrpt_playing_playerstate',
} as const;
export type LocalStorageKey =
  (typeof LocalStorageKey)[keyof typeof LocalStorageKey];
