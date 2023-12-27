import { ChangeEvent } from 'react';
import { PlayerIcon } from '@/config/playerIcon';
import styles from '@/styles/components/elements/playerList.module.scss';
import { APIData } from '@/types/apiData';
import PlayerPanel from './playerPanel';

type Props = {
  playerList: APIData.APIReplyPlayerData[] | APIData.APIPlayerBasicData[];
};

export default function Home({ playerList }: Props): JSX.Element {
  return (
    <div className={styles.outer}>
      <div className={styles.midder}>
        {playerList.map((player, index) => {
          return (
            <li key={index} className={styles.innerDefault}>
              <PlayerPanel
                initPlayerName={player.playerName}
                initPlayerIcon={player.playerIcon as PlayerIcon}
              />
            </li>
          );
        })}
      </div>
    </div>
  );
}
