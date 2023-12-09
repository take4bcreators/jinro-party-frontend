import { PlayerIcon } from '@/config/playerIcon';
import styles from '@/styles/components/elements/playerList.module.scss';
import { APIData } from '@/types/apiData';
import PlayerPanel from './playerPanel';

type Props = {
  playerList: APIData.APIReplyVotePlayerData[];
};

export default function Home({ playerList }: Props): JSX.Element {
  return (
    <div className={styles.outer}>
      <div className={styles.midder}>
        {playerList.map((player, index) => {
          return (
            <li key={index} className={styles.innerDefault}>
              <div className={styles.voteResultFlexWrapper}>
                <PlayerPanel
                  initPlayerName={player.voterPlayerName}
                  initPlayerIcon={player.voterPlayerIcon as PlayerIcon}
                />
                <div className={styles.voteResultArrow}>→</div>
                <PlayerPanel
                  initPlayerName={player.receiverPlayerName}
                  initPlayerIcon={player.receiverPlayerIcon as PlayerIcon}
                />
              </div>
            </li>
          );
        })}
      </div>
    </div>
  );
}
