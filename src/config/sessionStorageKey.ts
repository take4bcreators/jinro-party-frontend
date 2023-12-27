/** sessionStorageのキー */
export const SessionStorageKey = {
  /** セッションID */
  jrptGeneralSessionid: 'jrpt_general_sessionid',
} as const;
export type SessionStorageKey =
  (typeof SessionStorageKey)[keyof typeof SessionStorageKey];
