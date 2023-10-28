/** プレイヤーの役職 */
export const PlayerRole = {
  /** 未設定 */
  Empty: 'Empty',
  /** 市民 */
  Citizen: 'Citizen',
  /** 占い師 */
  Seer: 'Seer',
  /** 霊能者 */
  Medium: 'Medium',
  /** 狩人 */
  Hunter: 'Hunter',
  /** 人狼 */
  Werewolf: 'Werewolf',
  /** 狂人 */
  Madman: 'Madman',
} as const;
export type PlayerRole = (typeof PlayerRole)[keyof typeof PlayerRole];
