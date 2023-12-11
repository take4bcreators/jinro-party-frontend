import { useEffect, useRef, useState } from 'react';
import StateTitle from '@/components/elements/stateTitle';
import Timer from '@/components/elements/timer';
import PlayingLayout from '@/components/layouts/playingLayout';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { PlayingLayoutStyle } from '@/config/playingLayoutStyle';
import { StateTitleStyle } from '@/config/stateTitleStyle';
import { TimerState } from '@/config/timerState';
import styles from '@/styles/app/mt/playing/playing.module.scss';
import { APIService } from '@/utils/apiService';

type Props = {
  timerStateStr: string;
  initialCountStr: string;
};

export default function Home({
  timerStateStr,
  initialCountStr,
}: Props): JSX.Element {
  let timerState: TimerState | undefined = undefined;
  if (timerStateStr !== '') {
    timerState = timerStateStr as TimerState;
  }
  let initialCount: number | undefined = undefined;
  if (initialCountStr !== '') {
    initialCount = parseInt(initialCountStr);
  }
  const [apiTimerState, setAPITimerState] = useState(timerState);
  const [apiTimerCount, setAPITimerCount] = useState(initialCount);

  const count = useRef(0);
  let timerCount = 0;
  if (initialCount == undefined) {
    timerCount = count.current;
  } else {
    timerCount = initialCount * 0.001;
    count.current = timerCount;
  }

  useEffect(() => {
    if (apiTimerState != undefined) {
      return;
    }
    if (apiTimerCount != undefined) {
      return;
    }
    (async () => {
      const timerData = await APIService.getFetchTimerData();
      if (timerData == undefined) {
        return;
      }
      setAPITimerState(timerData.timerState);
      const timerCount = Math.floor(timerData.timeCountMSec * 0.001);
      setAPITimerCount(timerCount);
    })();
  }, [apiTimerState, apiTimerCount]);

  return (
    <PlayingLayout
      flexType={FlexBaseLayoutStyle.Default}
      type={PlayingLayoutStyle.SkyBlue}
      bgDecoration={true}
    >
      <StateTitle type={StateTitleStyle.Default} title={'Debate Time'} />
      <p>
        {timerState != undefined ? (
          <Timer timerState={timerState} initialCount={timerCount} />
        ) : (
          <Timer timerState={apiTimerState} initialCount={apiTimerCount} />
        )}
      </p>
      <p className={styles.textUnderInformation}>
        今夜処刑する人を
        <wbr />
        話し合いで決めてください
      </p>
    </PlayingLayout>
  );
}
