import { useEffect, useState } from 'react';
import { useRef } from 'react';
import PlayerPanel from '@/components/elements/playerPanel';
import StateTitle from '@/components/elements/stateTitle';
import Timer from '@/components/elements/timer';
import PlayingLayout from '@/components/layouts/playingLayout';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { PlayerIcon } from '@/config/playerIcon';
import { PlayerPanelStyle } from '@/config/playerPanelStyle';
import { PlayingLayoutStyle } from '@/config/playingLayoutStyle';
import { StateTitleStyle } from '@/config/stateTitleStyle';
import { TimerStyle } from '@/config/timerStyle';
import styles from '@/styles/app/mt/playing/playing.module.scss';
import { APIData } from '@/types/apiData';
import { APIService } from '@/utils/apiService';

const DEBUG: boolean = false;

type Props = {
  timerState: string;
  initialCount: string;
};

export default function Home({ timerState, initialCount }: Props): JSX.Element {
  const [dropoutPlayer, setDropoutPlayer] = useState<
    APIData.APIPlayerBasicData | undefined
  >(undefined);

  // タイマー関連
  const count = useRef(0);
  let timerCount = 0;
  if (initialCount === '') {
    timerCount = count.current;
  } else {
    timerCount = parseInt(initialCount) * 0.001;
    count.current = timerCount;
  }

  useEffect(() => {
    (async () => {
      if (DEBUG) {
        const resData: APIData.APIPlayerBasicData = {
          deviceId: '000000',
          playerName: '太郎',
          playerIcon: 'Icon01',
        };
        setDropoutPlayer(resData);
        return;
      }
      const resData = await APIService.getFetchDropoutPlayer();
      if (resData == undefined) {
        return;
      }
      setDropoutPlayer(resData);
    })();
  }, []);

  if (dropoutPlayer == undefined) {
    return <></>;
  }

  // return (
  //   <>
  //     <section>
  //       <h1>投票結果</h1>
  //       <p>{dropoutPlayer.playerName}</p>
  //       <p>{dropoutPlayer.playerIcon}</p>
  //       <p>追放</p>
  //       <p>10秒で遺言をどうぞ</p>
  //       <p>残り時間..</p>
  //       <p>
  //         <Timer timerState={timerState} initialCount={timerCount} />
  //       </p>
  //     </section>
  //   </>
  // );
  return (
    <PlayingLayout
      flexType={FlexBaseLayoutStyle.Default}
      type={PlayingLayoutStyle.Purple}
      bgDecoration={true}
    >
      <StateTitle type={StateTitleStyle.Purple} title={'Voting Result'} />
      <PlayerPanel
        initPlayerName={dropoutPlayer.playerName}
        initPlayerIcon={dropoutPlayer.playerIcon as PlayerIcon}
        type={PlayerPanelStyle.Large}
      />
      {/* <p>{dropoutPlayer.playerName}</p>
      <p>{dropoutPlayer.playerIcon}</p> */}
      <div className={styles.textFlexSet}>
        <p className={styles.textCenterSmall}>DROP OUT</p>
      </div>
      <p className={styles.textFixedRightBottom}>
        <Timer
          timerState={timerState}
          initialCount={timerCount}
          timerStyle={TimerStyle.Medium}
        />
      </p>
    </PlayingLayout>
  );
}
