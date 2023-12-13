import { GameState } from './gameState';

export namespace GameStateSetting {
  export const GameStateName = new Map<GameState, string>([
    [GameState.Empty, '未設定'],
    [GameState.PreGame, 'ゲーム開始前'],
    [GameState.PlayerJoining, 'プレイヤー受付中'],
    [GameState.PlayerJoiningEnded, 'プレイヤー受付終了・設定'],
    [GameState.PlayerListDisplay, 'プレイヤーリスト発表'],
    [GameState.RoleAssignment, '役職決定'],
    [GameState.DayPhaseStart, '昼フェーズ開始'],
    [GameState.DayPhase, '昼フェーズ'],
    [GameState.DayPhaseEnd, '昼フェーズ終了'],
    [GameState.Voting, '投票'],
    [GameState.VotingEnd, '投票終了'],
    [GameState.VoteResult, '投票結果発表'],
    [GameState.ExileAnnouncement, '追放者発表'],
    [GameState.FinalExileAnnouncement, '追放者発表（ゲーム終了直前）'],
    [GameState.NightPhaseStart, '夜フェーズ開始'],
    [GameState.NightPhase, '夜フェーズ'],
    [GameState.NightPhaseEnd, '夜フェーズ終了'],
    [GameState.MorningPhaseStart, '朝フェーズ開始'],
    [GameState.NightActionResult, '襲撃者発表'],
    [GameState.GameEnd, 'ゲーム終了'],
    [GameState.FinalResult, '結果発表'],
    [GameState.RoleReveal, '役職公開'],
  ]);
}
