import { PlayerState } from '@/config/playerState';
import { APIService } from '@/utils/apiService';
import { DeviceIdService } from '@/utils/deviceIdService';
import { LocalStorageService } from '@/utils/localStorageService';
import { useEffect, useState } from 'react';

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
    <>
      <section>
        <p>あなたは...</p>
        <p>
          <strong>{isDropOut ? '脱落' : '生存'}</strong>
        </p>
        <p>しました。</p>
      </section>
    </>
  );
}
