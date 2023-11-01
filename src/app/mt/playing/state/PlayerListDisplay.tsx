import { APIData } from '@/types/apiData';
import { APIService } from '@/utils/apiService';
import { useEffect, useState } from 'react';

export default function Home(): JSX.Element {
  const [allPlayer, setAllPlayer] = useState<
    APIData.APIReplyPlayerData[] | undefined
  >(undefined);

  useEffect(() => {
    (async () => {
      const allPlayerInfo = await APIService.getFetchAllPlayerInfo();
      if (allPlayerInfo == undefined) {
        return;
      }
      setAllPlayer(allPlayerInfo);
    })();
  }, []);

  if (allPlayer == undefined) {
    return (
      <>
        <p>ロード中...</p>
      </>
    );
  }

  return (
    <>
      <section>
        <h1>プレイヤーリスト発表</h1>
        {allPlayer.map((player, index) => {
          return (
            <section key={index}>
              <h2>{player.playerName}</h2>
              <p>アイコン：{player.playerIcon}</p>
            </section>
          );
        })}
      </section>
    </>
  );
}
