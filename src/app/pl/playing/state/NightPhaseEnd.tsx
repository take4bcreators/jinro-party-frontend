import StateTitle from '@/components/elements/stateTitle';
import PlayingFooter from '@/components/layouts/playingFooter';
import PlayingLayout from '@/components/layouts/playingLayout';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { PlayingLayoutStyle } from '@/config/playingLayoutStyle';
import { StateTitleStyle } from '@/config/stateTitleStyle';
import styles from '@/styles/app/pl/playing/playing.module.scss';

export default function Home(): JSX.Element {
  return (
    <PlayingLayout
      flexType={FlexBaseLayoutStyle.FooterCenter}
      type={PlayingLayoutStyle.Dark}
    >
      <StateTitle type={StateTitleStyle.Dark} title={'Night Time'}>
        <p>操作を終了してください</p>
      </StateTitle>
      <PlayingFooter useRoleCheck={true} useLogoLink={true} />
    </PlayingLayout>
  );
}
