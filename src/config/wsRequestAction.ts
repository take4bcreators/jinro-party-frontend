/** WebSocketでリクエストするアクション名 */
export const WsRequestAction = {
  /** 未設定 */
  Empty: 'Empty',
  /** アクションなし（デバッグ用） */
  NoAction: 'NoAction',
  /** ゲーム状態更新 */
  GameStateUpdate: 'GameStateUpdate',
  /** ゲーム画面変更 */
  GameScreenChange: 'GameScreenChange',
  /** カウントダウンタイマー開始 */
  CountdownTimerStart: 'CountdownTimerStart',
  /** カウントダウンタイマー一時停止 */
  CountdownTimerPause: 'CountdownTimerPause',
  /** カウントダウンタイマー再開 */
  CountdownTimerResume: 'CountdownTimerResume',
  /** ゲーム状態確認 */
  ReturnCurrentGameState: 'ReturnCurrentGameState',
  /** 役職確認登録 */
  RoleRegistration: 'RoleRegistration',
  /** 追放者投票登録 */
  ExileVoteRegistration: 'ExileVoteRegistration',
  /** アンケート登録 */
  SurveyRegistration: 'SurveyRegistration',
  /** 占い師のアクション実行 */
  SeerActionExecute: 'SeerActionExecute',
  /** 霊能者のアクション実行 */
  MediumActionExecute: 'MediumActionExecute',
  /** 狩人のアクション実行 */
  HunterActionExecute: 'HunterActionExecute',
  /** 人狼による襲撃者投票 */
  WerewolfAttackVote: 'WerewolfAttackVote',
  /** 生存者情報展開 */
  SurvivorInfoDisplay: 'SurvivorInfoDisplay',
  /** 人狼襲撃者投票情報展開 */
  WerewolfAttackVoteInfoDisplay: 'WerewolfAttackVoteInfoDisplay',
  /** 各プレイヤー向け脱落情報展開 */
  PlayerEliminationInfoDisplay: 'PlayerEliminationInfoDisplay',
  /** モニター向け脱落情報展開 */
  SpectatorEliminationInfoDisplay: 'SpectatorEliminationInfoDisplay',
  /** 投票結果情報展開 */
  VoteResultInfoDisplay: 'VoteResultInfoDisplay',
  /** 最終結果情報展開 */
  FinalResultInfoDisplay: 'FinalResultInfoDisplay',
  /** 役職一覧情報展開 */
  RoleListInfoDisplay: 'RoleListInfoDisplay',
  /** ゲームマスター向けゲーム情報展開 */
  GameMasterGameInfoDisplay: 'GameMasterGameInfoDisplay',
  /** ゲーム終了 */
  GameEnd: 'GameEnd',
} as const;
export type WsRequestAction =
  (typeof WsRequestAction)[keyof typeof WsRequestAction];
