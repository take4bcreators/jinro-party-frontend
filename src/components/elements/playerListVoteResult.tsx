import { PlayerIcon } from '@/config/playerIcon';
import styles from '@/styles/components/elements/playerList.module.scss';
import { APIData } from '@/types/apiData';
import { PlayerDisplayName } from '@/utils/playerDisplayName';
import PlayerPanel from './playerPanel';

type Props = {
  playerList: APIData.APIReplyVotePlayerData[];
};

export default function Home({ playerList }: Props): JSX.Element {
  return (
    <div className={styles.outer}>
      <div className={styles.midder}>
        {playerList.map((player, index) => {
          const voterPlayerName = new PlayerDisplayName(
            player.voterPlayerName
          ).getPlayerName();
          const voterPlayerIcon = player.voterPlayerIcon as PlayerIcon;
          const receiverPlayerName = new PlayerDisplayName(
            player.receiverPlayerName
          ).getPlayerName();
          const receiverPlayerIcon = player.receiverPlayerIcon as PlayerIcon;
          return (
            <li key={index} className={styles.innerDefault}>
              <div className={styles.voteResultFlexWrapper}>
                <div className={styles.voteResultPlayers}>
                  <PlayerPanel
                    initPlayerName={voterPlayerName}
                    initPlayerIcon={voterPlayerIcon}
                  />
                </div>
                <div className={styles.voteResultArrow}>→</div>
                <div className={styles.voteResultPlayers}>
                  <PlayerPanel
                    initPlayerName={receiverPlayerName}
                    initPlayerIcon={receiverPlayerIcon}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </div>
    </div>
  );
}
