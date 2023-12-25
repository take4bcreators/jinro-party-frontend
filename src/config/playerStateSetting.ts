import { PlayerState } from './playerState';

export namespace PlayerStateSetting {
  export const StateName = new Map<PlayerState, string>([
    /** 未設定 */
    [PlayerState.Empty, '未設定'],
    /** 生存 */
    [PlayerState.Alive, '生存'],
    /** 脱落 */
    [PlayerState.Dead, '脱落'],
  ]);
}
