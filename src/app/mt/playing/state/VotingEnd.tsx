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
  // return (
  //   <>
  //     <h1>投票終了</h1>
  //   </>
  // );
  return (
    <PlayingLayout
      flexType={FlexBaseLayoutStyle.Default}
      type={PlayingLayoutStyle.Orange}
      bgDecoration={true}
    >
      <StateTitle type={StateTitleStyle.Orange} title={'Voting Time'} />
      <p className={[styles.textCenterLarge, racingsans.className].join(' ')}>
        FINISH
      </p>
      <p className={styles.textUnderInformation}>投票を締め切りました</p>
    </PlayingLayout>
  );
}
