'use client';
import type { APIWsData } from '@/types/apiWsData';
import { GameState } from '@/config/gameState';
import { WsService } from '@/utils/wsService';
import { useEffect, useState } from 'react';

import PageLoading from './other/Loading';
import PagePreGame from './state/PreGame';
import PageDayPhase from './state/DayPhase';
import PageNightPhase from './state/NightPhase';
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
    case GameState.PreGame:
      return <PagePreGame />;
    case GameState.DayPhase:
      return <PageDayPhase />;
    case GameState.NightPhase:
      return <PageNightPhase />;
    default:
      break;
  }

  return <PageLoading />;
}
