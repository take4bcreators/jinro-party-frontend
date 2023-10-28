'use client';
import type { APIWsData } from '@/types/apiWsData';
import { GameState } from '@/config/gameState';
import { WsService } from '@/utils/wsService';
import { useEffect, useState } from 'react';

import PageLoading from './other/Loading';
import PagePreGame from './state/PreGame';
import PageDayPhase from './state/DayPhase';
import PageNightPhase from './state/NightPhase';
import PagePlayerListDisplay from './state/PlayerListDisplay';
import PageRoleAssignment from './state/RoleAssignment';
import { WsSenderType } from '@/config/wsSenderType';

export default function Home(): JSX.Element {
  const [wsService, setWsService] = useState<WsService | undefined>(undefined);
  const [wsIsOpen, setWsIsOpen] = useState(false);
  const [wsRcvData, setWsRcvData] = useState<APIWsData | undefined>(undefined);

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

  const nextState = wsRcvData.actionParameter01 as GameState;
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
      break; // @todo
    case GameState.DayPhase:
      return <PageDayPhase />;
    case GameState.DayPhaseEnd:
      break; // @todo
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