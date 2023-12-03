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
import StateTitle from '@/components/elements/stateTitle';
import { StateTitleStyle } from '@/config/stateTitleStyle';

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
    <PlayingLayout
      flexType={FlexBaseLayoutStyle.Top}
      type={PlayingLayoutStyle.Purple}
    >
      <div className={styles.headerTitle}>
        <StateTitle type={StateTitleStyle.Purple} title={'Voting Result'} />
      </div>
      <div className={styles.topInformation}>
        <p>あなたは...</p>
        <p className={styles.largeInformation}>
          <strong>{isDropOut ? '脱落' : '生存'}</strong>
        </p>
        <p>しました</p>
      </div>
      <PlayingFooter />
    </PlayingLayout>
  );
}
