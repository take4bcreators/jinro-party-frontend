export namespace APIRouting {
  /** APIのルーティング */
  export const Point = {
    /** WebSocket */
    WebSocket: '/api/ws',
    /** GET: ゲーム状態取得 */
    GetGetGameState: '/api/get-get-game-state',
    /** POST: デバイスIDの存在確認 */
    PostExistsDeviceId: '/api/post-exists-device-id',
    /** POST: プレイヤー生存確認 */
    PostCheckPlayerAlive: '/api/post-check-player-alive',
    /** POST: 新規ゲーム情報保存 */
    PostSaveNewGame: '/api/post-save-new-game',
    /** POST: エントリー用デバイスIDの存在確認 */
    PostExistsEntryDeviceId: '/api/post-exists-entry-device-id',
    /** POST: エントリー用プレイヤー名重複確認 */
    PostCheckDuplEntryPlayerName: '/api/post-check-dupl-entry-player-name',
    /** POST: エントリー用プレイヤーデータ仮登録 */
    PostPlayerTempRegist: '/api/post-player-temp-regist',
    /** POST: エントリー用プレイヤーデータ登録 */
    PostPlayerRegist: '/api/post-player-regist',
    /** POST: エントリー用プレイヤーデータ削除 */
    PostPlayerRegistRemove: '/api/post-player-regist-remove',
    /** GET: プレイヤーデータ全削除 */
    GetExecAllPlayerRemove: '/api/get-exec-all-player-remove',
    /** GET: エントリープレイヤーデータ全削除 */
    GetExecAllEntryRemove: '/api/get-exec-all-entry-remove',
    /** GET: エントリープレイヤーデータ本登録実行 */
    GetExecEntryRegist: '/api/get-exec-entry-regist',
    /** POST: ゲーム状態変更 */
    PostChangeGameState: '/api/post-change-game-state',
    /** GET: 全プレイヤーデータ取得 */
    GetFetchAllPlayerData: '/api/get-fetch-all-player-data',
    /** POST: 役職確認済み情報送信 */
    PostSelfRoleChecked: '/api/post-self-role-checked',
    /** Post: プレイヤーデータ取得 */
    PostFetchPlayerData: '/api/post-fetch-player-data',
    /** GET: 接続用疎通確認実行 */
    GetExecPing: '/api/get-exec-ping',
    /** GET: 追放者投票対象プレイヤー取得 */
    GetFetchMainVoteReceivers: '/api/get-fetch-main-vote-receivers',
    /** POST: 追放者投票登録 */
    PostSaveMainVote: '/api/post-save-main-vote',
    /** GET: 投票結果取得 */
    GetFetchVoteResult: '/api/get-fetch-vote-result',
    /** GET: 追放者プレイヤー情報取得 */
    GetFetchDropoutPlayer: '/api/get-fetch-dropout-player',
    /** POST: 占い師テーブルデータ存在確認 */
    PostExistsNightActionData: '/api/post-exists-night-action-data',
    /** POST: 占い師テーブルデータ取得 */
    PostFetchNightActionData: '/api/post-fetch-night-action-data',
    /** POST: 他生存プレイヤーデータ取得 */
    PostFetchOtherAlivePlayers: '/api/post-fetch-other-alive-players',
    /** POST: 占い師アクション実行 */
    PostExecSeerAction: '/api/post-exec-seer-action',
    /** POST: アンケートアクション実行 */
    PostExecEnqueteAction: '/api/post-exec-enquete-action',
    /** POST: 狩人アクション実行 */
    PostExecHunterAction: '/api/post-exec-hunter-action',
    /** POST: 人狼アクション実行 */
    PostExecWerewolfAction: '/api/post-exec-werewolf-action',
    /** POST: 霊能者アクション実行 */
    PostExecMediumAction: '/api/post-exec-medium-action',
    /** GET: 人狼以外生存プレイヤー情報取得 */
    GetFetchAliversForWerewolf: '/api/get-fetch-alivers-for-werewolf',
    /** POST: 人狼アクション実行プレイヤー確認 */
    PostCheckWerewolfExecuter: '/api/post-check-werewolf-executer',
    /** GET: 勝利チーム取得 */
    GetFetchWinningTeam: '/api/get-fetch-winning-team',
    /** GET: 終了ゲームリセット */
    GetEndGameReset: '/api/get-end-game-reset',
  } as const;
  export type Point = (typeof Point)[keyof typeof Point];
}
