import { PlayerState } from '@/config/playerState';
import { LocalStorageService } from '@/utils/localStorageService';
import { useEffect } from 'react';
import { Dispatch, SetStateAction } from 'react';
import PlayingLayout from '@/components/layouts/playingLayout';
import { PlayingLayoutStyle } from '@/config/playingLayoutStyle';

import Logo from '@/components/elements/logo';
import { LogoStyle } from '@/config/logoStyle';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import PlayerPanel from '@/components/elements/playerPanel';
import styles from '@/styles/app/pl/playing/playing.module.scss';
import PlayingFooter from '@/components/layouts/playingFooter';

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
    <PlayingLayout type={PlayingLayoutStyle.SkyBlue}>
      <h1>Debate Time</h1>
      <p>
        今夜処刑する人を
        <wbr />
        話し合いで決めてください
      </p>
      <PlayingFooter />
    </PlayingLayout>
  );
}
