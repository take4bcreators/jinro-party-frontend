'use client';
import type { APIWsData } from '@/types/apiWsData';
import { GameState } from '@/config/gameState';
import { WsService } from '@/utils/wsService';
import { useEffect, useRef, useState } from 'react';
import { WsSenderType } from '@/config/wsSenderType';

import PageLoading from './other/Loading';
import PagePreGame from './state/PreGame';
import PagePlayerListDisplay from './state/PlayerListDisplay';
import PageRoleAssignment from './state/RoleAssignment';
import PageDayPhaseStart from './state/DayPhaseStart';
import PageDayPhase from './state/DayPhase';
import PageDayPhaseEnd from './state/DayPhaseEnd';
import PageVoting from './state/Voting';
import PageVotingEnd from './state/VotingEnd';
import PageVoteResult from './state/VoteResult';
import PageExileAnnouncement from './state/ExileAnnouncement';
import PageFinalExileAnnouncement from './state/FinalExileAnnouncement';
import PageNightPhaseStart from './state/NightPhaseStart';
import PageNightPhase from './state/NightPhase';
import PageNightPhaseEnd from './state/NightPhaseEnd';
import PageMorningPhaseStart from './state/MorningPhaseStart';
import PageNightActionResult from './state/NightActionResult';
import PageGameEnd from './state/GameEnd';
import PageFinalResult from './state/FinalResult';
import PageRoleReveal from './state/RoleReveal';

import { WsRequestAction } from '@/config/wsRequestAction';

export default function Home(): JSX.Element {
  const [wsService, setWsService] = useState<WsService | undefined>(undefined);
  const [wsIsOpen, setWsIsOpen] = useState(false);
  const [wsRcvData, setWsRcvData] = useState<APIWsData | undefined>(undefined);
  const lastGameState = useRef<GameState>(GameState.Empty);

  useEffect(() => {
    setWsService(
      new WsService(WsSenderType.GameMasterSite, setWsIsOpen, setWsRcvData)
    );
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

  // const nextState = wsRcvData.actionParameter01 as GameState;
  switch (nextState) {
    case GameState.Empty:
      break; // @todo
    case GameState.PreGame:
      return <PagePreGame />;
    case GameState.PlayerJoining:
      break; // @todo
    case GameState.PlayerJoiningEnded:
      break; // @todo
    case GameState.PlayerListDisplay:
      return <PagePlayerListDisplay />;
    case GameState.RoleAssignment:
      return <PageRoleAssignment />;
    case GameState.DayPhaseStart:
      return <PageDayPhaseStart />;
    case GameState.DayPhase:
      return <PageDayPhase timerState={param01} initialCount={param02} />;
    case GameState.DayPhaseEnd:
      return <PageDayPhaseEnd />;
    case GameState.Voting:
      return <PageVoting timerState={param01} initialCount={param02} />;
    case GameState.VotingEnd:
      return <PageVotingEnd />;
    case GameState.VoteResult:
      return <PageVoteResult />;
    case GameState.ExileAnnouncement:
      return (
        <PageExileAnnouncement timerState={param01} initialCount={param02} />
      );
    case GameState.FinalExileAnnouncement:
      return <PageFinalExileAnnouncement />;
    case GameState.NightPhaseStart:
      return <PageNightPhaseStart />;
    case GameState.NightPhase:
      return <PageNightPhase timerState={param01} initialCount={param02} />;
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
