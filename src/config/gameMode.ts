/** ゲームモード */
export const GameMode = {
  /** ノーマルモード */
  Normal: 'Normal',
} as const;
export type GameMode = (typeof GameMode)[keyof typeof GameMode];
