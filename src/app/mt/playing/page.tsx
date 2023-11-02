'use client';
import type { APIWsData } from '@/types/apiWsData';
import { GameState } from '@/config/gameState';
import { WsService } from '@/utils/wsService';
import { useEffect, useRef, useState } from 'react';
import { WsSenderType } from '@/config/wsSenderType';

import PageLoading from './other/Loading';
import PagePreGame from './state/PreGame';
import PagePlayerJoining from './state/PlayerJoining';
import PagePlayerJoiningEnded from './state/PlayerJoiningEnded';
import PagePlayerListDisplay from './state/PlayerListDisplay';
import PageRoleAssignment from './state/RoleAssignment';
import PageDayPhaseStart from './state/DayPhaseStart';
import PageDayPhase from './state/DayPhase';
import PageDayPhaseEnd from './state/DayPhaseEnd';
import PageNightPhase from './state/NightPhase';
import { WsRequestAction } from '@/config/wsRequestAction';

export default function Home(): JSX.Element {
  const [wsRcvData, setWsRcvData] = useState<APIWsData | undefined>(undefined);
  const [wsIsOpen, setWsIsOpen] = useState(false);
  const [wsService, setWsService] = useState<WsService | undefined>(undefined);
  const lastGameState = useRef<GameState>(GameState.Empty);

  useEffect(() => {
    const wss = new WsService(
      WsSenderType.MonitorSite,
      setWsIsOpen,
      setWsRcvData
    );
    setWsService(wss);
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

  if (wsRcvData == undefined) {
    return <PageLoading />;
  }
  if (wsService == undefined) {
    return <PageLoading />;
  }

  let nextState: GameState = GameState.Empty;
  let actionParameter01: string = '';
  if (wsRcvData.requestAction === WsRequestAction.GameScreenChange) {
    nextState = wsRcvData.actionParameter01 as GameState;
    lastGameState.current = nextState;
  } else {
    nextState = lastGameState.current;
    actionParameter01 = wsRcvData.actionParameter01;
  }

  // const nextState = wsRcvData.actionParameter01 as GameState;
  switch (nextState) {
    case GameState.Empty:
      break; // @todo
    case GameState.PreGame:
      return <PagePreGame />;
    case GameState.PlayerJoining:
      return <PagePlayerJoining />;
    case GameState.PlayerJoiningEnded:
      return <PagePlayerJoiningEnded />;
    case GameState.PlayerListDisplay:
      return <PagePlayerListDisplay />;
    case GameState.RoleAssignment:
      return <PageRoleAssignment />;
    case GameState.DayPhaseStart:
      return <PageDayPhaseStart />;
    case GameState.DayPhase:
      return <PageDayPhase />;
    case GameState.DayPhaseEnd:
      return <PageDayPhaseEnd />;
    case GameState.Voting:
      break; // @todo
    case GameState.VotingEnd:
      break; // @todo
    case GameState.VoteResult:
      break; // @todo
    case GameState.ExileAnnouncement:
      break; // @todo
    case GameState.FinalExileAnnouncement:
      break; // @todo
    case GameState.NightPhaseStart:
      break; // @todo
    case GameState.NightPhase:
      return <PageNightPhase />;
    case GameState.NightPhaseEnd:
      break; // @todo
    case GameState.MorningPhaseStart:
      break; // @todo
    case GameState.NightActionResult:
      break; // @todo
    case GameState.GameEnd:
      break; // @todo
    case GameState.FinalResult:
      break; // @todo
    case GameState.RoleReveal:
      break; // @todo
    default:
      break;
  }

  console.warn('nextState is other');
  return <PageLoading />;
}
