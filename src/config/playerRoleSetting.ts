import { PlayerRole } from './playerRole';

export namespace PlayerRoleSetting {
  export const RoleName = new Map<PlayerRole, string>([
    [PlayerRole.Empty, '未設定'],
    [PlayerRole.Citizen, '村人'],
    [PlayerRole.Seer, '占い師'],
    [PlayerRole.Medium, '霊能者'],
    [PlayerRole.Hunter, '狩人'],
    [PlayerRole.Werewolf, '人狼'],
    [PlayerRole.Madman, '狂人'],
  ]);
}
