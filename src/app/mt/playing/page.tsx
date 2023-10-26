'use client';
import type { APIWsData } from '@/types/apiWsData';
import { GameState } from '@/config/gameState';
import { WsService } from '@/utils/wsService';
import { useEffect, useState } from 'react';
import { WsSenderType } from '@/config/wsSenderType';

import PageLoading from './other/Loading';
import PagePreGame from './state/PreGame';
import PageDayPhase from './state/DayPhase';
import PageNightPhase from './state/NightPhase';
import PagePlayerJoining from './state/PlayerJoining';
import PagePlayerJoiningEnded from './state/PlayerJoiningEnded';
import PagePlayerListDisplay from './state/PlayerListDisplay';
import PageRoleAssignment from './state/RoleAssignment';

export default function Home(): JSX.Element {
  const [wsRcvData, setWsRcvData] = useState<APIWsData | undefined>(undefined);
  const [wsIsOpen, setWsIsOpen] = useState(false);
  const [wsService, setWsService] = useState<WsService | undefined>(undefined);

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

  const nextState = wsRcvData.actionParameter01 as GameState;
  switch (nextState) {
    case GameState.Empty:
      break;
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
      break;
    case GameState.DayPhase:
      return <PageDayPhase />;
    case GameState.DayPhaseEnd:
      break;
    case GameState.Voting:
      break;
    case GameState.VotingEnd:
      break;
    case GameState.VoteResult:
      break;
    case GameState.ExileAnnouncement:
      break;
    case GameState.FinalExileAnnouncement:
      break;
    case GameState.NightPhaseStart:
      break;
    case GameState.NightPhase:
      return <PageNightPhase />;
    case GameState.NightPhaseEnd:
      break;
    case GameState.MorningPhaseStart:
      break;
    case GameState.NightActionResult:
      break;
    case GameState.GameEnd:
      break;
    case GameState.FinalResult:
      break;
    case GameState.RoleReveal:
      break;
    default:
      break;
  }

  return <PageLoading />;
}
