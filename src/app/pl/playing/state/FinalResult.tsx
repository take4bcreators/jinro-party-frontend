import { PlayerTeam } from '@/config/playerTeam';
import { APIService } from '@/utils/apiService';
import { LocalStorageService } from '@/utils/localStorageService';
import { useState, useEffect } from 'react';

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
    <>
      <h1>最終結果</h1>
      <p>
        <strong>{winningTeam === selfTeam ? '勝利！！' : '敗北...'}</strong>
      </p>
    </>
  );
}
