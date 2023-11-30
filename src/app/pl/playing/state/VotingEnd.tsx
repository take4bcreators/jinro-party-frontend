import PlayingLayout from '@/components/layouts/playingLayout';
import { PlayingLayoutStyle } from '@/config/playingLayoutStyle';

import Logo from '@/components/elements/logo';
import { LogoStyle } from '@/config/logoStyle';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import PlayerPanel from '@/components/elements/playerPanel';
import styles from '@/styles/app/pl/playing/playing.module.scss';
import PlayingFooter from '@/components/layouts/playingFooter';

export default function Home(): JSX.Element {
  return (
    <PlayingLayout type={PlayingLayoutStyle.Orange}>
      <h1>投票終了</h1>
      <PlayingFooter />
    </PlayingLayout>
  );
}
