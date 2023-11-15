import { PlayerTeam } from './playerTeam';

export namespace PlayerTeamSetting {
  export const TeamName = new Map<PlayerTeam, string>([
    [PlayerTeam.Empty, '未設定'],
    [PlayerTeam.Townsfolk, '市民陣営'],
    [PlayerTeam.WerewolfPack, '人狼陣営'],
  ]);
}
