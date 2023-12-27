import { TimerState } from '@/config/timerState';

/**
 * タイマーデータ
 */
export type TimerData = {
  /** タイマーの状態 */
  timerState: TimerState;
  /** タイマーのカウント */
  timerCount: number;
};
