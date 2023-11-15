import { PlayerState } from './playerState';

export namespace PlayerStateSetting {
  export const StateName = new Map<PlayerState, string>([
    [PlayerState.Empty, '未設定'],
    [PlayerState.Alive, '生存'],
    [PlayerState.Dead, '脱落'],
  ]);
}
