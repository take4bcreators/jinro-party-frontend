'use client';
import { useEffect, useRef, useState } from 'react';
import { GameState } from '@/config/gameState';
import { WsRequestAction } from '@/config/wsRequestAction';
import { WsSenderType } from '@/config/wsSenderType';
import { WsService } from '@/utils/wsService';
import PageLoading from './other/Loading';
import GameMaster from './state/GameMaster';
import type { APIWsData } from '@/types/apiWsData';

export default function Home(): JSX.Element {
  const [wsService, setWsService] = useState<WsService | undefined>(undefined);
  const [wsIsOpen, setWsIsOpen] = useState(false);
  const [wsRcvData, setWsRcvData] = useState<APIWsData | undefined>(undefined);
  // const lastGameState = useRef<GameState>(GameState.Empty);
  const voteChangeCount = useRef(0);

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
  switch (wsRcvData.requestAction) {
    case WsRequestAction.GameScreenChange:
      nextState = wsRcvData.actionParameter01 as GameState;
      // lastGameState.current = nextState;
      return <GameMaster gameState={nextState} />;
    case WsRequestAction.VoteTableChange:
      voteChangeCount.current++;
      return <GameMaster voteChangeCount={voteChangeCount.current} />;
    default:
      return <GameMaster />;
  }
}
