import { PlayerTeam } from './playerTeam';

export namespace PlayerTeamSetting {
  export const TeamName = new Map<PlayerTeam, string>([
    [PlayerTeam.Empty, '未設定'],
    [PlayerTeam.Townsfolk, '村人チーム'],
    [PlayerTeam.WerewolfPack, '人狼チーム'],
  ]);
}
