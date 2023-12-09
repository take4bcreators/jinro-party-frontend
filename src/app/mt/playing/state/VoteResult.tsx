import { useState, useEffect, useLayoutEffect } from 'react';
import PlayerListVoteResult from '@/components/elements/playerListVoteResult';
import StateTitle from '@/components/elements/stateTitle';
import PlayingLayout from '@/components/layouts/playingLayout';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { PlayingLayoutStyle } from '@/config/playingLayoutStyle';
import { StateTitleStyle } from '@/config/stateTitleStyle';
import styles from '@/styles/app/mt/playing/playing.module.scss';
import { APIData } from '@/types/apiData';
import { APIService } from '@/utils/apiService';

const DEBUG: boolean = false;

export default function Home(): JSX.Element {
  const [voteResult, setVoteResult] = useState<
    APIData.APIReplyAllVotePlayerData | undefined
  >(undefined);

  useEffect(() => {
    (async () => {
      if (DEBUG) {
        const PLAYER_COUNT: number = 12;
        const debugPlayerList: APIData.APIReplyVotePlayerData[] = [];
        for (let index = 1; index <= PLAYER_COUNT; index++) {
          const iconNumber = ((index - 1) % 10) + 1;
          debugPlayerList.push({
            voterDeviceId: `dummy${index.toString().padStart(3, '0')}`,
            voterPlayerName: `プレイヤー${index}`,
            voterPlayerIcon: `Icon${iconNumber.toString().padStart(2, '0')}`,
            receiverDeviceId: `dummy${index.toString().padStart(3, '0')}`,
            receiverPlayerName: `プレイヤー${index}`,
            receiverPlayerIcon: `Icon${iconNumber.toString().padStart(2, '0')}`,
          });
        }
        const setInfo: APIData.APIReplyAllVotePlayerData = {
          allVotePlayerData: debugPlayerList,
        };
        setVoteResult(setInfo);
        return;
      }
      const resData = await APIService.getFetchVoteResult();
      if (resData == undefined) {
        return;
      }
      setVoteResult(resData);
    })();
  }, []);

  useLayoutEffect(() => {
    setInterval(() => {
      const scrollPositionY = (() => {
        if (scrollY === 0) {
          return document.documentElement.scrollHeight;
        }
        return 0;
      })();
      scrollTo({
        top: scrollPositionY,
        behavior: 'smooth',
      });
    }, 2500);
  }, []);

  if (voteResult == undefined) {
    return <></>;
  }

  return (
    <PlayingLayout
      flexType={FlexBaseLayoutStyle.Top}
      type={PlayingLayoutStyle.Purple}
      bgDecoration={true}
    >
      <div className={styles.top}>
        <StateTitle type={StateTitleStyle.Purple} title={'Vote Result'} />
      </div>
      {/* <ul>
        {voteResult.allVotePlayerData.map((player, index) => {
          return (
            <li key={index}>
              {player.voterPlayerName} → {player.receiverPlayerName}
            </li>
          );
        })}
      </ul> */}
      {voteResult == undefined ? (
        <></>
      ) : (
        <ul className={styles.playerDisplayList}>
          <PlayerListVoteResult playerList={voteResult.allVotePlayerData} />
        </ul>
      )}
    </PlayingLayout>
  );
}
