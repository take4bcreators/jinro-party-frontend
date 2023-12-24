import { useEffect } from 'react';
import { Dispatch, SetStateAction } from 'react';
import StateTitle from '@/components/elements/stateTitle';
import PlayingFooter from '@/components/layouts/playingFooter';
import PlayingLayout from '@/components/layouts/playingLayout';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { PlayerState } from '@/config/playerState';
import { PlayingLayoutStyle } from '@/config/playingLayoutStyle';
import { StateTitleStyle } from '@/config/stateTitleStyle';
import styles from '@/styles/app/pl/playing/playing.module.scss';
import { LocalStorageService } from '@/utils/localStorageService';

type Props = {
  setDropOutFunc: Dispatch<SetStateAction<boolean>>;
};

export default function Home({ setDropOutFunc }: Props): JSX.Element {
  useEffect(() => {
    const playerState = LocalStorageService.getPlayingPlayerState();
    if (playerState === PlayerState.Dead) {
      setDropOutFunc(true);
      return;
    }
  }, [setDropOutFunc]);

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
      <PlayingFooter useRoleCheck={true} useLogoLink={true} />
    </PlayingLayout>
  );
}
