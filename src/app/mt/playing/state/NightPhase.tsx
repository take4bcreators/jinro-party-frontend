import { useRef } from 'react';
import StateTitle from '@/components/elements/stateTitle';
import Timer from '@/components/elements/timer';
import PlayingLayout from '@/components/layouts/playingLayout';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { PlayingLayoutStyle } from '@/config/playingLayoutStyle';
import { StateTitleStyle } from '@/config/stateTitleStyle';
import styles from '@/styles/app/mt/playing/playing.module.scss';

type Props = {
  timerState: string;
  initialCount: string;
};

export default function Home({ timerState, initialCount }: Props): JSX.Element {
  const count = useRef(0);
  let timerCount = 0;
  if (initialCount === '') {
    timerCount = count.current;
  } else {
    timerCount = parseInt(initialCount) * 0.001;
    count.current = timerCount;
  }

  return (
    <PlayingLayout
      flexType={FlexBaseLayoutStyle.Default}
      type={PlayingLayoutStyle.Dark}
      bgDecoration={true}
    >
      <StateTitle type={StateTitleStyle.Dark} title={'Night Time'} />
      <p>
        <Timer timerState={timerState} initialCount={timerCount} />
      </p>
      <p className={styles.textUnderInformation}>
        各自のスマートフォンで、
        <wbr />
        役職の操作をしてください
      </p>
    </PlayingLayout>
  );
}
