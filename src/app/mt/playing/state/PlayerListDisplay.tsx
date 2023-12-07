import { useEffect, useLayoutEffect, useState } from 'react';
import Logo from '@/components/elements/logo';
import PlayerList from '@/components/elements/playerList';
import PlayerPanel from '@/components/elements/playerPanel';
import DarkForestLayout from '@/components/layouts/darkForestLayout';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { LogoStyle } from '@/config/logoStyle';
import { PlayerRole } from '@/config/playerRole';
import { PlayerState } from '@/config/playerState';
import { PlayerTeam } from '@/config/playerTeam';
import styles from '@/styles/app/mt/playing/playing.module.scss';
import { APIData } from '@/types/apiData';
import { APIService } from '@/utils/apiService';

const DEBUG: boolean = false;

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
      if (DEBUG) {
        const PLAYER_COUNT: number = 8;
        const debugPlayerList: APIData.APIReplyPlayerData[] = [];
        for (let index = 1; index <= PLAYER_COUNT; index++) {
          const iconNumber = ((index - 1) % 10) + 1;
          debugPlayerList.push({
            deviceId: `dummy${index.toString().padStart(3, '0')}`,
            playerName: `プレイヤー${index}`,
            playerIcon: `Icon${iconNumber.toString().padStart(2, '0')}`,
            playerRole: PlayerRole.Empty,
            playerTeam: PlayerTeam.Empty,
            playerState: PlayerState.Empty,
          });
        }
        setAllPlayer(debugPlayerList);
        return;
      }
      setAllPlayer(allPlayerInfo);
    })();
  }, []);

  useLayoutEffect(() => {
    setInterval(() => {
      const scrollPositionY = (() => {
        if (scrollY === 0) {
          return document.documentElement.scrollHeight;
        }
        return 0;
      })();
      scrollTo({
        top: scrollPositionY,
        behavior: 'smooth',
      });
    }, 2500);
    // console.log(document.documentElement.scrollHeight);
  }, []);

  // if (allPlayer == undefined) {
  //   return (
  //     <>
  //       <p>ロード中...</p>
  //     </>
  //   );
  // }

  // return (
  //   <>
  //     <section>
  //       <h1>プレイヤーリスト発表</h1>
  //       {allPlayer.map((player, index) => {
  //         return (
  //           <section key={index}>
  //             <h2>{player.playerName}</h2>
  //             <p>アイコン：{player.playerIcon}</p>
  //           </section>
  //         );
  //       })}
  //     </section>
  //   </>
  // );

  return (
    <DarkForestLayout flexType={FlexBaseLayoutStyle.Top}>
      {/* <div className={styles.headerTitle}>
        <h1>参加プレイヤー</h1>
      </div> */}
      <div className={styles.stickyTopDefault}>
        <Logo type={LogoStyle.Small} />
        {/* <h1>参加プレイヤー</h1> */}
        <div className={styles.playerDisplayTitleText}>
          <h1>参加プレイヤー</h1>
        </div>
      </div>
      {/* <Logo type={LogoStyle.Small} /> */}
      {/* <div className={styles.topInformation}> */}
      {/* <div className={styles.playerDisplayTitleText}>
        <h1>参加プレイヤー</h1>
      </div> */}
      {allPlayer == undefined ? (
        <></>
      ) : (
        <ul className={styles.playerDisplayList}>
          <PlayerList playerList={allPlayer} />
        </ul>
      )}
      <div className={styles.bottomDummy}></div>
    </DarkForestLayout>
  );
}
