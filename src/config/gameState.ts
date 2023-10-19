/** ゲームの状態 */
export const GameState = {
  /** 未設定 */
  Empty: 'Empty',
  /** ゲーム開始前 */
  PreGame: 'PreGame',
  /** プレイヤー受付中 */
  PlayerJoining: 'PlayerJoining',
  /** プレイヤー受付終了・設定 */
  PlayerJoiningEnded: 'PlayerJoiningEnded',
  /** プレイヤーリスト発表 */
  PlayerListDisplay: 'PlayerListDisplay',
  /** 役職決定 */
  RoleAssignment: 'RoleAssignment',
  /** 昼フェーズ開始 */
  DayPhaseStart: 'DayPhaseStart',
  /** 昼フェーズ */
  DayPhase: 'DayPhase',
  /** 昼フェーズ終了 */
  DayPhaseEnd: 'DayPhaseEnd',
  /** 投票 */
  Voting: 'Voting',
  /** 投票終了 */
  VotingEnd: 'VotingEnd',
  /** 投票結果発表 */
  VoteResult: 'VoteResult',
  /** 追放者発表 */
  ExileAnnouncement: 'ExileAnnouncement',
  /** 追放者発表（ゲーム終了直前） */
  FinalExileAnnouncement: 'FinalExileAnnouncement',
  /** 夜フェーズ開始 */
  NightPhaseStart: 'NightPhaseStart',
  /** 夜フェーズ */
  NightPhase: 'NightPhase',
  /** 夜フェーズ終了 */
  NightPhaseEnd: 'NightPhaseEnd',
  /** 朝フェーズ開始 */
  MorningPhaseStart: 'MorningPhaseStart',
  /** 襲撃者発表 */
  NightActionResult: 'NightActionResult',
  /** ゲーム終了 */
  GameEnd: 'GameEnd',
  /** 結果発表 */
  FinalResult: 'FinalResult',
  /** 役職公開 */
  RoleReveal: 'RoleReveal',
} as const;
export type GameState = (typeof GameState)[keyof typeof GameState];
