import { PlayerTeam } from '@/config/playerTeam';
import { PlayerTeamSetting } from '@/config/playerTeamSetting';
import { APIService } from '@/utils/apiService';
import { useState, useEffect } from 'react';

export default function Home(): JSX.Element {
  const [winningTeam, setWinningTeam] = useState<PlayerTeam | undefined>(
    undefined
  );

  useEffect(() => {
    (async () => {
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

  return (
    <>
      <p>
        <strong>{PlayerTeamSetting.TeamName.get(winningTeam)} 勝利！！</strong>
      </p>
    </>
  );
}
