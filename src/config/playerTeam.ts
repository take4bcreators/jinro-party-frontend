/** プレイヤーのチーム */
export const PlayerTeam = {
  /** 市民陣営 */
  Townsfolk: 'Townsfolk',
  /** 人狼陣営 */
  WerewolfPack: 'WerewolfPack',
} as const;
export type PlayerTeam = (typeof PlayerTeam)[keyof typeof PlayerTeam];
