'use client';
import { useEffect, useRef, useState } from 'react';
import { GameState } from '@/config/gameState';
import { TimerState } from '@/config/timerState';
import { WsRequestAction } from '@/config/wsRequestAction';
import { WsSenderType } from '@/config/wsSenderType';
import { WsService } from '@/utils/wsService';
import PageLoading from './other/Loading';
import PageDayPhase from './state/DayPhase';
import PageDayPhaseEnd from './state/DayPhaseEnd';
import PageDayPhaseStart from './state/DayPhaseStart';
import PageExileAnnouncement from './state/ExileAnnouncement';
import PageFinalExileAnnouncement from './state/FinalExileAnnouncement';
import PageFinalResult from './state/FinalResult';
import PageGameEnd from './state/GameEnd';
import PageMorningPhaseStart from './state/MorningPhaseStart';
import PageNightActionResult from './state/NightActionResult';
import PageNightPhase from './state/NightPhase';
import PageNightPhaseEnd from './state/NightPhaseEnd';
import PageNightPhaseStart from './state/NightPhaseStart';
import PagePlayerJoining from './state/PlayerJoining';
import PagePlayerJoiningEnded from './state/PlayerJoiningEnded';
import PagePlayerListDisplay from './state/PlayerListDisplay';
import PagePreGame from './state/PreGame';
import PageRoleAssignment from './state/RoleAssignment';
import PageRoleReveal from './state/RoleReveal';
import PageVoteResult from './state/VoteResult';
import PageVoting from './state/Voting';
import PageVotingEnd from './state/VotingEnd';
import type { APIWsData } from '@/types/apiWsData';

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
  let param01: string = '';
  let param02: string = '';
  let param03: string = '';
  switch (wsRcvData.requestAction) {
    case WsRequestAction.GameScreenChange:
      nextState = wsRcvData.actionParameter01 as GameState;
      lastGameState.current = nextState;
      break;
    case WsRequestAction.TimerStateChange:
      nextState = wsRcvData.actionParameter01 as GameState;
      lastGameState.current = nextState;
      break;
    case WsRequestAction.ReturnEntryPlayerCount:
      nextState = lastGameState.current;
      param01 = wsRcvData.actionParameter01;
      break;
    default:
      nextState = lastGameState.current;
      param01 = wsRcvData.actionParameter01;
      break;
  }

  switch (nextState) {
    case GameState.Empty:
      break; // @todo
    case GameState.PreGame:
      return <PagePreGame />;
    case GameState.PlayerJoining:
      return <PagePlayerJoining entryPlayerCount={param01} />;
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
      return <PageNightPhaseStart />;
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
