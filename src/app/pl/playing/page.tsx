'use client';
import type { APIWsData } from '@/types/apiWsData';
import { GameState } from '@/config/gameState';
import { WsService } from '@/utils/wsService';
import { useEffect, useState } from 'react';
import PageLoading from './other/Loading';
import PagePreGame from './state/PreGame';
import PageDayPhase from './state/DayPhase';
import PageNightPhase from './state/NightPhase';
import PlayerJoiningEnded from './state/PlayerJoiningEnded';
import { WsSenderType } from '@/config/wsSenderType';
import { APIService } from '@/utils/apiService';
import { DeviceIdService } from '@/utils/deviceIdService';
import { useRouter } from 'next/navigation';

export default function Home(): JSX.Element {
  const router = useRouter();
  const [existsDeviceId, setExistsDeviceId] = useState(false);
  const [isAlivePlayer, setIsAlivePlayer] = useState(false);
  const [pageChange, setPageChange] = useState(false);
  const [wsIsOpen, setWsIsOpen] = useState(false);
  const [wsRcvData, setWsRcvData] = useState<APIWsData | undefined>(undefined);
  const [wsService, setWsService] = useState<WsService | undefined>(undefined);

  useEffect(() => {
    const deviceIdAPIData = DeviceIdService.getToAPIData();
    APIService.execPOSTExistsDeviceId(deviceIdAPIData).then((resValue) => {
      if (resValue == undefined) {
        return;
      }
      if (!resValue) {
        router.push('/pl/error/');
        setPageChange(true);
        return;
      }
      setExistsDeviceId(true);
    });
  }, [router]);

  useEffect(() => {
    if (!existsDeviceId) {
      return;
    }
    const deviceIdAPIData = DeviceIdService.getToAPIData();
    APIService.execPOSTCheckPlayerAlive(deviceIdAPIData).then((isAlive) => {
      if (isAlive == undefined) {
        return;
      }
      if (!isAlive) {
        router.push('/pl/gameover/');
        setPageChange(true);
        return;
      }
      setIsAlivePlayer(true);
    });
  }, [router, existsDeviceId]);

  useEffect(() => {
    if (!isAlivePlayer) {
      return;
    }
    const wss = new WsService(
      WsSenderType.PlayerSite,
      setWsIsOpen,
      setWsRcvData
    );
    setWsService(wss);
  }, [isAlivePlayer]);

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
  if (pageChange) {
    return <PageLoading />;
  }

  const nextState = wsRcvData.actionParameter01 as GameState;
  switch (nextState) {
    case GameState.PreGame:
      return <PagePreGame />;
    case GameState.PlayerJoiningEnded:
      return <PlayerJoiningEnded />;
    case GameState.DayPhase:
      return <PageDayPhase />;
    case GameState.NightPhase:
      return <PageNightPhase />;
    default:
      break;
  }

  return <PageLoading />;
}
