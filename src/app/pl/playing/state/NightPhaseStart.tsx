import { PlayerState } from '@/config/playerState';
import { LocalStorageService } from '@/utils/localStorageService';
// import { useRouter } from 'next/navigation';
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
  // const router = useRouter();
  useEffect(() => {
    const playerState = LocalStorageService.getPlayingPlayerState();
    if (playerState === PlayerState.Dead) {
      // 脱落した場合は、ページを再読み込みし、
      // 脱落用のページへ進む
      // router.refresh();
      setDropOutFunc(true);
      return;
    }
  }, [setDropOutFunc]);

  return (
    <PlayingLayout type={PlayingLayoutStyle.Dark}>
      <h1>Night Time</h1>
      <p>夜になりました</p>
      <PlayingFooter />
    </PlayingLayout>
  );
}
