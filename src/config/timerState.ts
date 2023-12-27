/** プレイヤーのチーム */
export const TimerState = {
  /** 停止中 */
  Stop: 'Stop',
  /** 起動中 */
  Start: 'Start',
  /** 一時停止中 */
  Pause: 'Pause',
} as const;
export type TimerState = (typeof TimerState)[keyof typeof TimerState];
