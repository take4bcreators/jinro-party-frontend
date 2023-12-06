import StateTitle from '@/components/elements/stateTitle';
import PlayingFooter from '@/components/layouts/playingFooter';
import PlayingLayout from '@/components/layouts/playingLayout';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { PlayingLayoutStyle } from '@/config/playingLayoutStyle';
import { StateTitleStyle } from '@/config/stateTitleStyle';

export default function Home(): JSX.Element {
  return (
    <PlayingLayout
      flexType={FlexBaseLayoutStyle.FooterCenter}
      type={PlayingLayoutStyle.SkyBlue}
      bgDecoration={true}
    >
      <StateTitle type={StateTitleStyle.Default} title={'Debate Time'}>
        <p>
          今夜処刑する人を
          <wbr />
          話し合いで決めてください
        </p>
      </StateTitle>
    </PlayingLayout>
  );
}
