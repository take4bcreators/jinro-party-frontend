import { ChangeEvent } from 'react';
import { PlayerIcon } from '@/config/playerIcon';
import { PlayerRoleSetting } from '@/config/playerRoleSetting';
import { PlayerTeam } from '@/config/playerTeam';
import styles from '@/styles/components/elements/playerList.module.scss';
import { APIData } from '@/types/apiData';
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
          return (
            <li key={index} className={styles.innerRoleReveal}>
              <PlayerPanel
                initPlayerName={player.playerName}
                initPlayerIcon={player.playerIcon as PlayerIcon}
              />
              <p className={styles.roleRevealTeam}>
                {winningTeam === player.playerTeam ? (
                  <span className={styles.roleRevealWin}>勝利</span>
                ) : (
                  ''
                )}
                {PlayerRoleSetting.RoleName.get(player.playerRole)}
              </p>
            </li>
          );
        })}
      </div>
    </div>
  );
}
