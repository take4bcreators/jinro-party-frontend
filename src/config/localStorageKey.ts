/** localStorageのキー */
export const LocalStorageKey = {
  /** デバイスID */
  jrptGeneralDeviceid: 'jrpt_general_deviceid',
  /** モード */
  jrptNewgameMode: 'jrpt_newgame_mode',
  /** プレイヤー名 */
  jrptEntryPlayername: 'jrpt_entry_playername',
  /** プレイヤーアイコン */
  jrptEntryPlayericon: 'jrpt_entry_playericon',
} as const;
export type LocalStorageKey =
  (typeof LocalStorageKey)[keyof typeof LocalStorageKey];
