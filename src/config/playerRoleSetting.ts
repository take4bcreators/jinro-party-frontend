import { PlayerRole } from './playerRole';

export namespace PlayerRoleSetting {
  export const RoleName = new Map<PlayerRole, string>([
    /** 未設定 */
    [PlayerRole.Empty, '未設定'],
    /** 市民 */
    [PlayerRole.Citizen, '平社員'],
    /** 占い師 */
    [PlayerRole.Seer, 'エンジニア'],
    /** 霊能者 */
    [PlayerRole.Medium, 'マーケティング担当'],
    /** 狩人 */
    [PlayerRole.Hunter, 'セキュリティリーダー'],
    /** 人狼 */
    [PlayerRole.Werewolf, '企業スパイ'],
    /** 狂人 */
    [PlayerRole.Madman, '裏切り者'],
  ]);
}
