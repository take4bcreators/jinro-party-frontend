import PlayingLayout from '@/components/layouts/playingLayout';
import { PlayingLayoutStyle } from '@/config/playingLayoutStyle';

import Logo from '@/components/elements/logo';
import { LogoStyle } from '@/config/logoStyle';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import PlayerPanel from '@/components/elements/playerPanel';
import styles from '@/styles/app/pl/playing/playing.module.scss';
import PlayingFooter from '@/components/layouts/playingFooter';
import StateTitle from '@/components/elements/stateTitle';
import { StateTitleStyle } from '@/config/stateTitleStyle';

export default function Home(): JSX.Element {
  return (
    <PlayingLayout
      flexType={FlexBaseLayoutStyle.FooterCenter}
      type={PlayingLayoutStyle.SkyBlue}
    >
      <StateTitle type={StateTitleStyle.Default} title={'Debate Time'}>
        <p>
          今夜処刑する人を
          <wbr />
          話し合いで決めてください
        </p>
      </StateTitle>
      <PlayingFooter />
    </PlayingLayout>
  );
}
