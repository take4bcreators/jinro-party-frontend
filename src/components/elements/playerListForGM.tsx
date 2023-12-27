import { GameState } from '@/config/gameState';
import { PlayerIcon } from '@/config/playerIcon';
import { PlayerPanelStyle } from '@/config/playerPanelStyle';
import { PlayerRoleSetting } from '@/config/playerRoleSetting';
import { PlayerStateSetting } from '@/config/playerStateSetting';
import { PlayerTeamSetting } from '@/config/playerTeamSetting';
import styles from '@/styles/components/elements/playerListForGM.module.scss';
import { APIData } from '@/types/apiData';
import PlayerPanel from './playerPanel';

type Props = {
  playerList: APIData.APIReplyPlayerData[];
  voteList?: APIData.APIReplyVotePlayerData[];
  playerFullList?: APIData.APIPlayerFullData[];
  nightActionList?: APIData.APINightActionData[];
  gameState?: GameState;
};

export default function Home({
  playerList,
  voteList,
  playerFullList,
  nightActionList,
  gameState,
}: Props): JSX.Element {
  const otherInfoName: string = (() => {
    switch (gameState) {
      case GameState.Voting:
      case GameState.VotingEnd:
      case GameState.VoteResult:
      case GameState.ExileAnnouncement:
        return '投票先';
      case GameState.RoleAssignment:
        return '確認';
      case GameState.NightPhaseStart:
      case GameState.NightPhase:
      case GameState.NightPhaseEnd:
      case GameState.MorningPhaseStart:
      case GameState.NightActionResult:
        return 'アクション対象';
      default:
        return '-';
    }
  })();

  function getOtherInfoStr(player: APIData.APIReplyPlayerData): string {
    switch (gameState) {
      case GameState.Voting:
      case GameState.VotingEnd:
      case GameState.VoteResult:
      case GameState.ExileAnnouncement:
        if (voteList == undefined) {
          return '';
        }
        const voteReceiver =
          voteList.find((vote) => {
            return vote.voterDeviceId === player.deviceId;
          })?.receiverPlayerName ?? '';
        return voteReceiver;
      case GameState.RoleAssignment:
        if (playerFullList == undefined) {
          return '';
        }
        const isCheck =
          playerFullList.find((pl) => {
            return pl.deviceId === player.deviceId;
          })?.selfRoleCheck ?? false;
        if (isCheck) {
          return 'OK';
        }
        return '';
      case GameState.NightPhaseStart:
      case GameState.NightPhase:
      case GameState.NightPhaseEnd:
      case GameState.MorningPhaseStart:
      case GameState.NightActionResult:
        if (nightActionList == undefined) {
          return '';
        }
        const actionReceiver =
          nightActionList.find((action) => {
            return action.deviceId === player.deviceId;
          })?.receiverPlayerName ?? '';
        return actionReceiver;
      default:
        return '';
    }
  }

  return (
    <div className={styles.outer}>
      <table className={styles.playerTable}>
        <caption className={styles.tableTitle}>{'Player Information'}</caption>
        <thead>
          <tr>
            <th>{'プレイヤー名'}</th>
            <th>{'チーム'}</th>
            <th>{'役職'}</th>
            <th>{'状態'}</th>
            <th>{otherInfoName}</th>
          </tr>
        </thead>
        <tbody>
          {playerList.map((player, _index) => {
            const otherInfoStr = getOtherInfoStr(player);
            return (
              <tr key={player.deviceId}>
                <td>
                  <PlayerPanel
                    initPlayerName={player.playerName}
                    initPlayerIcon={player.playerIcon as PlayerIcon}
                    type={PlayerPanelStyle.GameMaster}
                  />
                </td>
                <td>
                  {gameState === GameState.PlayerListDisplay
                    ? ''
                    : PlayerTeamSetting.TeamName.get(player.playerTeam)}
                </td>
                <td>
                  {gameState === GameState.PlayerListDisplay
                    ? ''
                    : PlayerRoleSetting.RoleName.get(player.playerRole)}
                </td>
                <td>
                  {gameState === GameState.PlayerListDisplay
                    ? ''
                    : PlayerStateSetting.StateName.get(player.playerState)}
                </td>
                <td>{otherInfoStr}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
