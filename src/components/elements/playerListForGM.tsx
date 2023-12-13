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
};

export default function Home({ playerList }: Props): JSX.Element {
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
            <th>{'その他'}</th>
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
                <td>{PlayerTeamSetting.TeamName.get(player.playerTeam)}</td>
                <td>{PlayerRoleSetting.RoleName.get(player.playerRole)}</td>
                <td>{PlayerStateSetting.StateName.get(player.playerState)}</td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
