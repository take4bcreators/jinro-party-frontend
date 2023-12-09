import { ChangeEvent } from 'react';
import { PlayerIcon } from '@/config/playerIcon';
import { PlayerRoleSetting } from '@/config/playerRoleSetting';
import { PlayerTeam } from '@/config/playerTeam';
import styles from '@/styles/components/elements/playerList.module.scss';
import { APIData } from '@/types/apiData';
import { PlayerDisplayName } from '@/utils/playerDisplayName';
import PlayerPanel from './playerPanel';

type Props = {
  playerList: APIData.APIReplyPlayerData[];
  winningTeam: PlayerTeam;
};

export default function Home({ playerList, winningTeam }: Props): JSX.Element {
  return (
    <div className={styles.outer}>
      <div className={styles.midder}>
        {playerList.map((player, index) => {
          const playerName = new PlayerDisplayName(
            player.playerName
          ).getPlayerName();
          const playerIcon = player.playerIcon as PlayerIcon;
          const playerTeam = player.playerTeam;
          const playerRoleName = PlayerRoleSetting.RoleName.get(
            player.playerRole
          );
          return (
            <li key={index} className={styles.innerRoleReveal}>
              <div className={styles.roleRevealPlayers}>
                <PlayerPanel
                  initPlayerName={playerName}
                  initPlayerIcon={playerIcon}
                />
              </div>
              <p className={styles.roleRevealTeam}>
                {winningTeam === playerTeam ? (
                  <span className={styles.roleRevealWin}>Win</span>
                ) : (
                  ''
                )}
                {playerRoleName}
              </p>
            </li>
          );
        })}
      </div>
    </div>
  );
}
