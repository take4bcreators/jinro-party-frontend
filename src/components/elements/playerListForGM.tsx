import { GameState } from '@/config/gameState';
import { PlayerIcon } from '@/config/playerIcon';
import { PlayerPanelStyle } from '@/config/playerPanelStyle';
import { PlayerRole } from '@/config/playerRole';
import { PlayerRoleSetting } from '@/config/playerRoleSetting';
import { PlayerState } from '@/config/playerState';
import { PlayerStateSetting } from '@/config/playerStateSetting';
import { PlayerTeam } from '@/config/playerTeam';
import { PlayerTeamSetting } from '@/config/playerTeamSetting';
import styles from '@/styles/components/elements/playerListForGM.module.scss';
import { APIData } from '@/types/apiData';
import PlayerPanel from './playerPanel';

type Props = {
  playerList: APIData.APIReplyPlayerData[];
  voteList?: APIData.APIReplyVotePlayerData[];
  gameState?: GameState;
};

export default function Home({
  playerList,
  voteList,
  gameState,
}: Props): JSX.Element {
  console.log('voteList...');
  console.log(voteList);

  const otherInfoName: string = (() => {
    switch (gameState) {
      case GameState.Voting:
      case GameState.VotingEnd:
      case GameState.VoteResult:
      case GameState.ExileAnnouncement:
        return '投票先';
      default:
        return '-';
    }
  })();

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
            let infoStr: string = '';
            switch (gameState) {
              case GameState.Voting:
              case GameState.VotingEnd:
              case GameState.VoteResult:
              case GameState.ExileAnnouncement:
                if (voteList == undefined) {
                  infoStr = '';
                  break;
                }
                infoStr =
                  voteList.find((vote) => {
                    return vote.voterDeviceId === player.deviceId;
                  })?.receiverPlayerName ?? '';
                break;
              default:
                infoStr = '';
                break;
            }

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
                <td>{infoStr}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
