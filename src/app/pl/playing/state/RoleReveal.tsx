import { PlayerTeam } from '@/config/playerTeam';
import { APIService } from '@/utils/apiService';
import { LocalStorageService } from '@/utils/localStorageService';
import { useState, useEffect } from 'react';

import DarkForestLayout from '@/components/layouts/darkForestLayout';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import styles from '@/styles/app/pl/playing/playing.module.scss';
import LogoHeader from '@/components/layouts/logoHeader';
import PlayingFooter from '@/components/layouts/playingFooter';

export default function Home(): JSX.Element {
  const [winningTeam, setWinningTeam] = useState<PlayerTeam | undefined>(
    undefined
  );
  const [selfTeam, setSelfTeam] = useState<PlayerTeam | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const playerTeam = LocalStorageService.getPlayingPlayerTeam();
      setSelfTeam(playerTeam);
      const resData = await APIService.getFetchWinningTeam();
      if (resData == undefined) {
        return;
      }
      setWinningTeam(resData);
    })();
  }, []);

  if (winningTeam == undefined) {
    return <></>;
  }
  if (selfTeam == undefined) {
    return <></>;
  }

  return (
    <DarkForestLayout flexType={FlexBaseLayoutStyle.Top}>
      <LogoHeader />
      <div className={styles.topInformation}>
        <h1>最終結果</h1>
        <p className={styles.largeInformation}>
          <strong>{winningTeam === selfTeam ? '勝ち！' : '負け...'}</strong>
        </p>
      </div>
      <PlayingFooter />
    </DarkForestLayout>
  );
}
