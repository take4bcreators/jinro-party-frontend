import { PlayerTeam } from './playerTeam';

export namespace PlayerTeamSetting {
  export const TeamName = new Map<PlayerTeam, string>([
    /** 未設定 */
    [PlayerTeam.Empty, '未設定'],
    /** 市民陣営 */
    [PlayerTeam.Townsfolk, '会社チーム'],
    /** 人狼陣営 */
    [PlayerTeam.WerewolfPack, 'スパイチーム'],
  ]);
}
