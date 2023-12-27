import { Racing_Sans_One } from 'next/font/google';
import StateTitle from '@/components/elements/stateTitle';
import PlayingLayout from '@/components/layouts/playingLayout';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { PlayingLayoutStyle } from '@/config/playingLayoutStyle';
import { StateTitleStyle } from '@/config/stateTitleStyle';
import styles from '@/styles/app/mt/playing/playing.module.scss';

const racingsans = Racing_Sans_One({
  weight: ['400'],
  subsets: ['latin'],
});

export default function Home(): JSX.Element {
  return (
    <PlayingLayout
      flexType={FlexBaseLayoutStyle.Default}
      type={PlayingLayoutStyle.SkyBlue}
      bgDecoration={true}
    >
      <StateTitle type={StateTitleStyle.Default} title={'Debate Time'} />
      <p className={[styles.textCenterLarge, racingsans.className].join(' ')}>
        FINISH
      </p>
      <p className={styles.textUnderInformation}>
        話し合いを
        <wbr />
        終了してください
      </p>
    </PlayingLayout>
  );
}
