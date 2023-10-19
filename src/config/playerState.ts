/** プレイヤーの状態 */
export const PlayerState = {
  /** 未設定 */
  Empty: 'Empty',
  /** 生存 */
  Alive: 'Alive',
  /** 脱落 */
  Dead: 'Dead',
} as const;
export type PlayerState = (typeof PlayerState)[keyof typeof PlayerState];
