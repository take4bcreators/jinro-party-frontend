import { ChangeEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/elements/logo';
import PlayerListForGM from '@/components/elements/playerListForGM';
import DarkForestLayout from '@/components/layouts/darkForestLayout';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { GameState } from '@/config/gameState';
import { GameStateSetting } from '@/config/gameStateSetting';
import { LogoStyle } from '@/config/logoStyle';
import { PlayerRole } from '@/config/playerRole';
import { PlayerState } from '@/config/playerState';
import { PlayerTeam } from '@/config/playerTeam';
import styles from '@/styles/app/gm/playing/playing.module.scss';
import { APIData } from '@/types/apiData';
import { APIService } from '@/utils/apiService';
import { LocalStorageService } from '@/utils/localStorageService';

const DEBUG: boolean = false;

type Props = {
  gameState?: GameState;
  voteChangeCount?: number;
};

export default function Home({
  gameState,
  voteChangeCount,
}: Props): JSX.Element {
  const [allPlayer, setAllPlayer] = useState<
    APIData.APIReplyPlayerData[] | undefined
  >(undefined);

  const [voteResult, setVoteResult] = useState<
    APIData.APIReplyAllVotePlayerData | undefined
  >(undefined);

  const [viewMode, setViewMode] = useState('');

  const [currentGameState, setCurrentGameState] = useState<GameState>(
    GameState.Empty
  );

  useEffect(() => {
    if (gameState == undefined) {
      return;
    }
    setCurrentGameState(gameState);
  }, [gameState]);

  useEffect(() => {
    setViewMode(LocalStorageService.getGmViewmode() ?? 'OFF');
  }, []);

  function handleOptionChange(event: ChangeEvent<HTMLInputElement>) {
    const mode = event.target.value;
    setViewMode(mode);
    LocalStorageService.setGmViewmode(mode);
  }

  async function handleGameEndButton() {
    const resData = await APIService.getEndGameReset();
    if (resData == undefined) {
      return;
    }
  }

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
        return;
      }
      const allPlayerInfo = await APIService.getFetchAllPlayerInfo();
      if (allPlayerInfo == undefined) {
        return;
      }
      setAllPlayer(allPlayerInfo);
    })();
  }, [gameState]);

  useEffect(() => {
    if (voteChangeCount == undefined) {
      return;
    }
    (async () => {
      const resData = await APIService.getFetchVoteResult();
      if (resData == undefined) {
        return;
      }
      setVoteResult(resData);
    })();
  }, [voteChangeCount]);

  return (
    <DarkForestLayout flexType={FlexBaseLayoutStyle.Top}>
      <div className={styles.stickyTopDefault}>
        <Logo type={LogoStyle.Small} />
      </div>
      <div className={styles.modeSelect}>
        <h1 className={styles.modeSelectTitle}>View Mode</h1>
        <ul className={styles.modeSelectInputs}>
          <li>
            <label>
              <input
                type="radio"
                value={'ON'}
                checked={viewMode === 'ON'}
                onChange={handleOptionChange}
                className={styles.modeSelectInput}
              />
              ON
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                value={'OFF'}
                checked={viewMode === 'OFF'}
                onChange={handleOptionChange}
                className={styles.modeSelectInput}
              />
              OFF
            </label>
          </li>
        </ul>
      </div>
      {(() => {
        if (allPlayer == undefined || viewMode === 'OFF') {
          return <></>;
        }
        if (currentGameState === GameState.PlayerListDisplay) {
          const emptyRoleAllPlayer = allPlayer.map((player) => {
            player.playerRole = PlayerRole.Empty;
            player.playerTeam = PlayerTeam.Empty;
            player.playerState = PlayerState.Empty;
            return player;
          });
          return (
            <ul className={styles.playerDisplayList}>
              <PlayerListForGM
                playerList={emptyRoleAllPlayer}
                voteList={voteResult?.allVotePlayerData}
              />
            </ul>
          );
        }
        return (
          <ul className={styles.playerDisplayList}>
            <PlayerListForGM
              playerList={allPlayer}
              voteList={voteResult?.allVotePlayerData}
            />
          </ul>
        );
      })()}
      <dl>
        <dt>現在のゲーム状態</dt>
        <dd>{GameStateSetting.GameStateName.get(currentGameState)}</dd>
      </dl>
      {currentGameState === GameState.RoleReveal ? (
        <Link href="/gm/" onClick={handleGameEndButton}>
          ゲームを終了する
        </Link>
      ) : (
        <></>
      )}
      <div className={styles.bottomDummy}></div>
    </DarkForestLayout>
  );
}
