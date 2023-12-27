import StateTitle from '@/components/elements/stateTitle';
import PlayingLayout from '@/components/layouts/playingLayout';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { PlayingLayoutStyle } from '@/config/playingLayoutStyle';
import { StateTitleStyle } from '@/config/stateTitleStyle';

export default function Home(): JSX.Element {
  return (
    <PlayingLayout
      flexType={FlexBaseLayoutStyle.FooterCenter}
      type={PlayingLayoutStyle.Dark}
      bgDecoration={true}
    >
      <StateTitle type={StateTitleStyle.Dark} title={'Night Time'}>
        <p>
          各役職の
          <wbr />
          アクションを行います
        </p>
      </StateTitle>
    </PlayingLayout>
  );
}
