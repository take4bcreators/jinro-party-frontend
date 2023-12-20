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
};

export default function Home({ playerList, voteList }: Props): JSX.Element {
  console.log('voteList...');
  console.log(voteList);

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
            <th>{'投票先'}</th>
            <th>{'行動先'}</th>
          </tr>
        </thead>
        <tbody>
          {playerList.map((player, index) => {
            return (
              <tr key={index}>
                <td>
                  <PlayerPanel
                    initPlayerName={player.playerName}
                    initPlayerIcon={player.playerIcon as PlayerIcon}
                    type={PlayerPanelStyle.GameMaster}
                  />
                </td>
                <td>
                  {player.playerTeam === PlayerTeam.Empty
                    ? ''
                    : PlayerTeamSetting.TeamName.get(player.playerTeam)}
                </td>
                <td>
                  {player.playerRole === PlayerRole.Empty
                    ? ''
                    : PlayerRoleSetting.RoleName.get(player.playerRole)}
                </td>
                <td>
                  {player.playerState === PlayerState.Empty
                    ? ''
                    : PlayerStateSetting.StateName.get(player.playerState)}
                </td>
                <td>
                  {voteList == undefined
                    ? ''
                    : voteList.find((vote) => {
                        return vote.voterDeviceId === player.deviceId;
                      })?.receiverPlayerName ?? ''}
                </td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
