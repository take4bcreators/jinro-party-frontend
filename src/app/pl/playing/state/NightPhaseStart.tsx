import { PlayerState } from '@/config/playerState';
import { LocalStorageService } from '@/utils/localStorageService';
// import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Dispatch, SetStateAction } from 'react';

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
    <>
      <h1>夜のフェーズ開始</h1>
    </>
  );
}
