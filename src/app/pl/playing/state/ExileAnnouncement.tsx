import { PlayerState } from '@/config/playerState';
import { APIService } from '@/utils/apiService';
import { DeviceIdService } from '@/utils/deviceIdService';
import { LocalStorageService } from '@/utils/localStorageService';
import { useEffect, useState } from 'react';
import PlayingLayout from '@/components/layouts/playingLayout';
import { PlayingLayoutStyle } from '@/config/playingLayoutStyle';

import Logo from '@/components/elements/logo';
import { LogoStyle } from '@/config/logoStyle';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import PlayerPanel from '@/components/elements/playerPanel';
import styles from '@/styles/app/pl/playing/playing.module.scss';
import PlayingFooter from '@/components/layouts/playingFooter';

export default function Home(): JSX.Element {
  const [isDropOut, setDropOut] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const resData = await APIService.getFetchDropoutPlayer();
      if (resData == undefined) {
        return;
      }
      const deviceId = DeviceIdService.get();
      if (resData.deviceId === deviceId) {
        setDropOut(true);
        LocalStorageService.setPlayingPlayerState(PlayerState.Dead);
      } else {
        setDropOut(false);
      }
    })();
  }, []);

  if (isDropOut == undefined) {
    return <></>;
  }

  return (
    <PlayingLayout type={PlayingLayoutStyle.Purple}>
      <h1>Voting Result</h1>
      <p>あなたは...</p>
      <p>
        <strong>{isDropOut ? '脱落' : '生存'}</strong>
      </p>
      <p>しました</p>
      <PlayingFooter />
    </PlayingLayout>
  );
}
