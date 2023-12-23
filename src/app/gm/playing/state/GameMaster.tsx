import { ChangeEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/elements/button';
import Logo from '@/components/elements/logo';
import PlayerListForGM from '@/components/elements/playerListForGM';
import Timer from '@/components/elements/timer';
import DarkForestLayout from '@/components/layouts/darkForestLayout';
import { ButtonStyle } from '@/config/buttonStyle';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { GameState } from '@/config/gameState';
import { GameStateSetting } from '@/config/gameStateSetting';
import { LogoStyle } from '@/config/logoStyle';
import { PlayerRole } from '@/config/playerRole';
import { PlayerState } from '@/config/playerState';
import { PlayerTeam } from '@/config/playerTeam';
import { TimerStyle } from '@/config/timerStyle';
import styles from '@/styles/app/gm/playing/playing.module.scss';
import { APIData } from '@/types/apiData';
import { TimerData } from '@/types/timerData';
import { APIService } from '@/utils/apiService';
import { LocalStorageService } from '@/utils/localStorageService';
import { PromiseUtil } from '@/utils/promiseUtil';

const DEBUG: boolean = false;

type Props = {
  gameState?: GameState;
  voteChangeCount?: number;
  selfRoleCheckUpdateCount?: number;
  nightActionUpdateCount?: number;
};

export default function Home({
  gameState,
  voteChangeCount,
  selfRoleCheckUpdateCount,
  nightActionUpdateCount,
}: Props): JSX.Element {
  const [allPlayer, setAllPlayer] = useState<
    APIData.APIReplyPlayerData[] | undefined
  >(undefined);

  const [voteResult, setVoteResult] = useState<
    APIData.APIReplyAllVotePlayerData | undefined
  >(undefined);

  const [playerFullDataList, setPlayerFullDataList] = useState<
    APIData.APIMultiPlayerFullData | undefined
  >(undefined);

  const [nightActions, setNightActions] = useState<
    APIData.APIMultiNightActionData | undefined
  >(undefined);

  const [viewMode, setViewMode] = useState('');

  const [currentGameState, setCurrentGameState] = useState<GameState>(
    GameState.Empty
  );

  const [timerData, setTimerData] = useState<TimerData | undefined>(undefined);

  useEffect(() => {
    if (gameState == undefined) {
      return;
    }
    setCurrentGameState(gameState);
  }, [gameState]);

  useEffect(() => {
    setViewMode(LocalStorageService.getGmViewmode() ?? 'OFF');
  }, []);

  useEffect(() => {
    if (
      gameState !== GameState.DayPhase &&
      gameState !== GameState.Voting &&
      gameState !== GameState.ExileAnnouncement &&
      gameState !== GameState.NightPhase
    ) {
      return;
    }
    PromiseUtil.apiAutoRetry(5, 300, async () => {
      const timerData = await APIService.getFetchTimerData();
      if (timerData == undefined) {
        return true;
      }
      if (timerData.gameState === gameState) {
        const timerCount = Math.floor(timerData.timeCountMSec * 0.001);
        setTimerData({
          timerState: timerData.timerState,
          timerCount: timerCount,
        });
        return true;
      }
      return false;
    });
  }, [gameState]);

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

  useEffect(() => {
    if (selfRoleCheckUpdateCount == undefined) {
      return;
    }
    (async () => {
      const resData = await APIService.getFetchAllPlayerFullData();
      if (resData == undefined) {
        return;
      }
      setPlayerFullDataList(resData);
    })();
  }, [selfRoleCheckUpdateCount]);

  useEffect(() => {
    if (nightActionUpdateCount == undefined) {
      return;
    }
    (async () => {
      const resData = await APIService.getFetchNightAction();
      if (resData == undefined) {
        return;
      }
      setNightActions(resData);
    })();
  }, [nightActionUpdateCount]);

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
        return (
          <ul className={styles.playerDisplayList}>
            <PlayerListForGM
              playerList={allPlayer}
              voteList={voteResult?.allVotePlayerData}
              playerFullList={playerFullDataList?.allData}
              nightActionList={nightActions?.allData}
              gameState={currentGameState}
            />
          </ul>
        );
      })()}
      <ul>
        <li>
          現在のゲームシーン：
          {GameStateSetting.GameStateName.get(currentGameState)}
        </li>
        <li>
          タイマー：
          {timerData == undefined ? (
            <></>
          ) : (
            <Timer
              timerState={timerData.timerState}
              initialCount={timerData.timerCount}
              timerStyle={TimerStyle.NoStyle}
            />
          )}
        </li>
      </ul>
      <div className={styles.gameEndButton}>
        {currentGameState === GameState.RoleReveal ? (
          <Link href="/gm/" onClick={handleGameEndButton}>
            <Button type={ButtonStyle.Blue}>ゲームを終了する</Button>
          </Link>
        ) : (
          <></>
        )}
      </div>
      <div className={styles.bottomDummy}></div>
    </DarkForestLayout>
  );
}
