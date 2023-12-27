import { useEffect, useState } from 'react';
import StateTitle from '@/components/elements/stateTitle';
import Timer from '@/components/elements/timer';
import PlayingLayout from '@/components/layouts/playingLayout';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { GameState } from '@/config/gameState';
import { PlayingLayoutStyle } from '@/config/playingLayoutStyle';
import { StateTitleStyle } from '@/config/stateTitleStyle';
import styles from '@/styles/app/mt/playing/playing.module.scss';
import { TimerData } from '@/types/timerData';
import { APIService } from '@/utils/apiService';
import { PromiseUtil } from '@/utils/promiseUtil';

const THIS_GAME_STATE = GameState.NightPhase;

export default function Home(): JSX.Element {
  const [timerData, setTimerData] = useState<TimerData | undefined>(undefined);

  useEffect(() => {
    PromiseUtil.apiAutoRetry(5, 300, async () => {
      const timerData = await APIService.getFetchTimerData();
      if (timerData == undefined) {
        return true;
      }
      if (timerData.gameState === THIS_GAME_STATE) {
        const timerCount = Math.floor(timerData.timeCountMSec * 0.001);
        setTimerData({
          timerState: timerData.timerState,
          timerCount: timerCount,
        });
        return true;
      }
      return false;
    });
  }, []);

  return (
    <PlayingLayout
      flexType={FlexBaseLayoutStyle.Default}
      type={PlayingLayoutStyle.Dark}
      bgDecoration={true}
    >
      <StateTitle type={StateTitleStyle.Dark} title={'Night Time'} />
      <p>
        {timerData == undefined ? (
          <></>
        ) : (
          <Timer
            timerState={timerData.timerState}
            initialCount={timerData.timerCount}
          />
        )}
      </p>
      <p className={styles.textUnderInformation}>
        各自のスマートフォンで、
        <wbr />
        役職の操作をしてください
      </p>
    </PlayingLayout>
  );
}
