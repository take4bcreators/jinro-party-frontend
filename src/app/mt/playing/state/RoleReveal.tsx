import { useEffect, useState } from 'react';
import Logo from '@/components/elements/logo';
import PlayerListRoleReveal from '@/components/elements/playerListRoleReveal';
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
  const [winningTeam, setWinningTeam] = useState<PlayerTeam | undefined>(
    undefined
  );

  useEffect(() => {
    (async () => {
      if (DEBUG) {
        const PLAYER_COUNT: number = 8;
        const debugPlayerList: APIData.APIReplyPlayerData[] = [];
        for (let index = 1; index <= PLAYER_COUNT; index++) {
          const iconNumber = ((index - 1) % 10) + 1;
          debugPlayerList.push({
            deviceId: `dummy${index.toString().padStart(3, '0')}`,
            playerName: `プレイヤー${index}`,
            playerIcon: `Icon${iconNumber.toString().padStart(2, '0')}`,
            playerRole: PlayerRole.Citizen,
            playerTeam: PlayerTeam.Townsfolk,
            playerState: PlayerState.Alive,
          });
        }
        setAllPlayer(debugPlayerList);
        setWinningTeam(PlayerTeam.Townsfolk);
        return;
      }
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

  // return (
  //   <>
  //     <section>
  //       <h1>プレイヤー役職発表</h1>
  //       {allPlayer.map((player, index) => {
  //         return (
  //           <section key={index}>
  //             <h2>{player.playerName}</h2>
  //             <p>アイコン：{player.playerIcon}</p>
  //             <p>{PlayerRoleSetting.RoleName.get(player.playerRole)}</p>
  //             <p>{PlayerStateSetting.StateName.get(player.playerState)}</p>
  //             <p>{winningTeam === player.playerTeam ? '👑勝利' : ''}</p>
  //           </section>
  //         );
  //       })}
  //     </section>
  //   </>
  // );
  return (
    <DarkForestLayout flexType={FlexBaseLayoutStyle.Top}>
      <div className={styles.stickyTopDefault}>
        <Logo type={LogoStyle.Small} />
        <div className={styles.playerDisplayTitleText}>
          <h1>RESULT</h1>
        </div>
      </div>
      {/* {allPlayer.map((player, index) => {
        return (
          <section key={index}>
            <h2>{player.playerName}</h2>
            <p>アイコン：{player.playerIcon}</p>
            <p>{PlayerRoleSetting.RoleName.get(player.playerRole)}</p>
            <p>{PlayerStateSetting.StateName.get(player.playerState)}</p>
            <p>{winningTeam === player.playerTeam ? '👑勝利' : ''}</p>
          </section>
        );
      })} */}
      {allPlayer == undefined ? (
        <></>
      ) : (
        <ul className={styles.playerDisplayList}>
          <PlayerListRoleReveal
            playerList={allPlayer}
            winningTeam={winningTeam}
          />
        </ul>
      )}
      <div className={styles.bottomDummy}></div>
    </DarkForestLayout>
  );
}
