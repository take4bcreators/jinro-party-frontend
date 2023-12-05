import styles from '@/styles/components/elements/votingList.module.scss';
import { PlayerIcon } from '@/config/playerIcon';
import PlayerIconElem from './playerIconElem';
import PlayerPanel from './playerPanel';
import { ChangeEvent } from 'react';
import { APIData } from '@/types/apiData';

type Props = {
  playerList: APIData.APIReplyPlayerData[] | APIData.APIPlayerBasicData[];
  selectPlayerId: string;
  selectEvent: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function Home({
  playerList,
  selectPlayerId,
  selectEvent,
}: Props): JSX.Element {
  return (
    <div className={styles.outer}>
      <div className={styles.midder}>
        {playerList.map((player, index) => {
          return (
            <li
              key={index}
              className={
                selectPlayerId !== ''
                  ? selectPlayerId !== player.deviceId
                    ? styles.innerDisable
                    : styles.innerDefault
                  : styles.innerDefault
              }
            >
              <label>
                <input
                  type="radio"
                  value={player.deviceId}
                  checked={selectPlayerId === player.deviceId}
                  onChange={selectEvent}
                  className={styles.input}
                />
                <PlayerPanel
                  initPlayerName={player.playerName}
                  initPlayerIcon={player.playerIcon as PlayerIcon}
                />
              </label>
            </li>
          );
        })}
      </div>
    </div>
  );
}
