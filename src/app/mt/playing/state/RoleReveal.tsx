import { PlayerRoleSetting } from '@/config/playerRoleSetting';
import { PlayerStateSetting } from '@/config/playerStateSetting';
import { PlayerTeam } from '@/config/playerTeam';
import { APIData } from '@/types/apiData';
import { APIService } from '@/utils/apiService';
import { useEffect, useState } from 'react';

export default function Home(): JSX.Element {
  const [allPlayer, setAllPlayer] = useState<
    APIData.APIReplyPlayerData[] | undefined
  >(undefined);
  const [winningTeam, setWinningTeam] = useState<PlayerTeam | undefined>(
    undefined
  );

  useEffect(() => {
    (async () => {
      const allPlayerInfo = await APIService.getFetchAllPlayerInfo();
      if (allPlayerInfo == undefined) {
        return;
      }
      setAllPlayer(allPlayerInfo);
      const resData = await APIService.getFetchWinningTeam();
      if (resData == undefined) {
        return;
      }
      setWinningTeam(resData);
    })();
  }, []);

  if (allPlayer == undefined) {
    return (
      <>
        <p>ロード中...</p>
      </>
    );
  }
  if (winningTeam == undefined) {
    return (
      <>
        <p>ロード中...</p>
      </>
    );
  }

  return (
    <>
      <section>
        <h1>プレイヤー役職発表</h1>
        {allPlayer.map((player, index) => {
          return (
            <section key={index}>
              <h2>{player.playerName}</h2>
              <p>アイコン：{player.playerIcon}</p>
              <p>{PlayerRoleSetting.RoleName.get(player.playerRole)}</p>
              <p>{PlayerStateSetting.StateName.get(player.playerState)}</p>
              <p>{winningTeam === player.playerTeam ? '👑勝利' : ''}</p>
            </section>
          );
        })}
      </section>
    </>
  );
}
