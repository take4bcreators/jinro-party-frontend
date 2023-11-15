'use client';
import type { APIWsData } from '@/types/apiWsData';
import { GameState } from '@/config/gameState';
import { WsService } from '@/utils/wsService';
import { useEffect, useRef, useState } from 'react';

import PageLoading from './other/Loading';
import PageDropOut from './other/DropOut';
import PagePreGame from './state/PreGame';
import PagePlayerJoiningEnded from './state/PlayerJoiningEnded';
import PagePlayerListDisplay from './state/PlayerListDisplay';
import PageRoleAssignment from './state/RoleAssignment';
import PageDayPhaseStart from './state/DayPhaseStart';
import PageDayPhase from './state/DayPhase';
import PageDayPhaseEnd from './state/DayPhaseEnd';
import PageNightPhase from './state/NightPhase';
import PageVoting from './state/Voting';
import PageVotingEnd from './state/VotingEnd';
import PageVoteResult from './state/VoteResult';
import PageExileAnnouncement from './state/ExileAnnouncement';
import PageFinalExileAnnouncement from './state/FinalExileAnnouncement';
import PageNightPhaseStart from './state/NightPhaseStart';
import PageNightPhaseEnd from './state/NightPhaseEnd';
import PageMorningPhaseStart from './state/MorningPhaseStart';
import PageNightActionResult from './state/NightActionResult';
import PageGameEnd from './state/GameEnd';
import PageFinalResult from './state/FinalResult';
import PageRoleReveal from './state/RoleReveal';

import { WsSenderType } from '@/config/wsSenderType';
import { APIService } from '@/utils/apiService';
import { DeviceIdService } from '@/utils/deviceIdService';
import { useRouter } from 'next/navigation';
import { LocalStorageService } from '@/utils/localStorageService';
import { PlayerState } from '@/config/playerState';
import { WsRequestAction } from '@/config/wsRequestAction';

export default function Home(): JSX.Element {
  const router = useRouter();
  const [wsService, setWsService] = useState<WsService | undefined>(undefined);
  const [wsRcvData, setWsRcvData] = useState<APIWsData | undefined>(undefined);
  const [wsIsOpen, setWsIsOpen] = useState(false);
  const pagePushProgress = useRef(false);
  const [pushPage, setPushPage] = useState('');
  const lastGameState = useRef<GameState>(GameState.Empty);
  const [isDropOut, setDropOut] = useState(false);

  function movePage(page: string) {
    setPushPage(page);
    pagePushProgress.current = true;
  }

  useEffect(() => {
    (async () => {
      const deviceIdAPIData = DeviceIdService.getToAPIData();
      const playerData = await APIService.postFetchPlayerData(deviceIdAPIData);
      if (playerData == undefined) {
        movePage('/pl/error/');
        return;
      }
      if (playerData.deviceId === '') {
        movePage('/pl/error/');
        return;
      }
      LocalStorageService.setPlayingPlayerDataFromAPI(playerData);
      setWsService(
        new WsService(WsSenderType.PlayerSite, setWsIsOpen, setWsRcvData)
      );
      if (playerData.playerState === PlayerState.Dead) {
        // movePage('/pl/gameover/');
        setDropOut(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (wsService == undefined) {
      return;
    }
    if (!wsIsOpen) {
      return;
    }
    wsService.getCurrentGameState();
  }, [wsService, wsIsOpen]);

  const listenerAdd = useRef(false);
  useEffect(() => {
    if (wsService == undefined) {
      return;
    }
    if (!wsIsOpen) {
      return;
    }
    function visibleActionCallback() {
      if (wsService == undefined) {
        return;
      }
      if (!wsIsOpen) {
        return;
      }
      switch (document.visibilityState) {
        case 'visible':
          wsService.reconnectingWebSocket();
          break;
        case 'hidden':
          setWsIsOpen(false);
          return;
        default:
          break;
      }
    }
    if (listenerAdd.current) {
      return;
    }
    addEventListener('visibilitychange', visibleActionCallback);
    listenerAdd.current = true;
  }, [wsIsOpen, wsService]);

  useEffect(() => {
    if (pushPage === '') {
      return;
    }
    router.push(pushPage);
  }, [pushPage, router]);

  if (pagePushProgress.current) {
    console.log('pageChange is true');
    return <PageLoading />;
  }
  if (wsRcvData == undefined) {
    console.log('wsRcvData == undefined');
    return <PageLoading />;
  }
  if (wsService == undefined) {
    console.log('wsService == undefined');
    return <PageLoading />;
  }

  let nextState: GameState = GameState.Empty;
  let param01: string = '';
  let param02: string = '';
  let param03: string = '';
  if (wsRcvData.requestAction === WsRequestAction.GameScreenChange) {
    nextState = wsRcvData.actionParameter01 as GameState;
    lastGameState.current = nextState;
  } else if (wsRcvData.requestAction === WsRequestAction.CountdownTimerStart) {
    nextState = lastGameState.current;
    param01 = 'start';
    param02 = wsRcvData.actionParameter01;
  } else if (wsRcvData.requestAction === WsRequestAction.CountdownTimerPause) {
    nextState = lastGameState.current;
    param01 = 'pause';
  } else if (wsRcvData.requestAction === WsRequestAction.CountdownTimerResume) {
    nextState = lastGameState.current;
    param01 = 'start';
  } else {
    nextState = lastGameState.current;
    param01 = wsRcvData.actionParameter01;
  }

  if (isDropOut) {
    switch (nextState) {
      case GameState.GameEnd:
      case GameState.FinalResult:
      case GameState.RoleReveal:
      case GameState.PreGame:
        break;
      default:
        return <PageDropOut />;
    }
  }

  switch (nextState) {
    case GameState.Empty:
      break;
    case GameState.PreGame:
      return <PagePreGame />;
    case GameState.PlayerJoining:
      movePage('/pl/');
      return <PageLoading />;
    case GameState.PlayerJoiningEnded:
      return <PagePlayerJoiningEnded />;
    case GameState.PlayerListDisplay:
      return <PagePlayerListDisplay />;
    case GameState.RoleAssignment:
      return <PageRoleAssignment />;
    case GameState.DayPhaseStart:
      return <PageDayPhaseStart setDropOutFunc={setDropOut} />;
    case GameState.DayPhase:
      return <PageDayPhase />;
    case GameState.DayPhaseEnd:
      return <PageDayPhaseEnd />;
    case GameState.Voting:
      return <PageVoting />;
    case GameState.VotingEnd:
      return <PageVotingEnd />;
    case GameState.VoteResult:
      return <PageVoteResult />;
    case GameState.ExileAnnouncement:
      return <PageExileAnnouncement />;
    case GameState.FinalExileAnnouncement:
      return <PageFinalExileAnnouncement />;
    case GameState.NightPhaseStart:
      return <PageNightPhaseStart setDropOutFunc={setDropOut} />;
    case GameState.NightPhase:
      return <PageNightPhase />;
    case GameState.NightPhaseEnd:
      return <PageNightPhaseEnd />;
    case GameState.MorningPhaseStart:
      return <PageMorningPhaseStart />;
    case GameState.NightActionResult:
      return <PageNightActionResult />;
    case GameState.GameEnd:
      return <PageGameEnd />;
    case GameState.FinalResult:
      return <PageFinalResult />;
    case GameState.RoleReveal:
      return <PageRoleReveal />;
    default:
      break;
  }

  console.warn('nextState is other');
  return <PageLoading />;
}
