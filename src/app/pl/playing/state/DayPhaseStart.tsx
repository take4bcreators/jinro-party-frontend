import { PlayerState } from '@/config/playerState';
import { LocalStorageService } from '@/utils/localStorageService';
import { useEffect } from 'react';
import { Dispatch, SetStateAction } from 'react';

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
    <>
      <h1>昼のフェーズ開始</h1>
    </>
  );
}
