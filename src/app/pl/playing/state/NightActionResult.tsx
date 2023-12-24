import { useEffect, useState } from 'react';
import StateTitle from '@/components/elements/stateTitle';
import PlayingFooter from '@/components/layouts/playingFooter';
import PlayingLayout from '@/components/layouts/playingLayout';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { PlayerState } from '@/config/playerState';
import { PlayingLayoutStyle } from '@/config/playingLayoutStyle';
import { StateTitleStyle } from '@/config/stateTitleStyle';
import styles from '@/styles/app/pl/playing/playing.module.scss';
import { APIService } from '@/utils/apiService';
import { DeviceIdService } from '@/utils/deviceIdService';
import { LocalStorageService } from '@/utils/localStorageService';

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
      type={PlayingLayoutStyle.Red}
    >
      <div className={styles.headerTitle}>
        <StateTitle type={StateTitleStyle.Red} title={'Morning Time'} />
      </div>
      <div className={styles.topInformation}>
        <p>あなたは...</p>
        <p className={styles.largeInformation}>
          <strong>{isDropOut ? '脱落' : '生存'}</strong>
        </p>
        <p>しました</p>
      </div>
      <PlayingFooter useRoleCheck={true} useLogoLink={true} />
    </PlayingLayout>
  );
}
