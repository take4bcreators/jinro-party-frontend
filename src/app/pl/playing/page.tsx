'use client';
import type { APIWsData } from '@/types/apiWsData';
import { GameState } from '@/config/gameState';
import { WsService } from '@/utils/wsService';
import { useEffect, useRef, useState } from 'react';
import PageLoading from './other/Loading';
import PagePreGame from './state/PreGame';
import PageDayPhase from './state/DayPhase';
import PageNightPhase from './state/NightPhase';
import PagePlayerJoiningEnded from './state/PlayerJoiningEnded';
import PagePlayerListDisplay from './state/PlayerListDisplay';
import PageRoleAssignment from './state/RoleAssignment';

import { WsSenderType } from '@/config/wsSenderType';
import { APIService } from '@/utils/apiService';
import { DeviceIdService } from '@/utils/deviceIdService';
import { useRouter } from 'next/navigation';

export default function Home(): JSX.Element {
  const router = useRouter();
  const [existsDeviceId, setExistsDeviceId] = useState(false);
  const [isAlivePlayer, setIsAlivePlayer] = useState(false);
  const [wsIsOpen, setWsIsOpen] = useState(false);
  const [wsRcvData, setWsRcvData] = useState<APIWsData | undefined>(undefined);
  const [wsService, setWsService] = useState<WsService | undefined>(undefined);
  const pagePushProgress = useRef(false);
  const [pushPage, setPushPage] = useState('');

  function movePage(page: string) {
    setPushPage(page);
    pagePushProgress.current = true;
  }

  useEffect(() => {
    const deviceIdAPIData = DeviceIdService.getToAPIData();
    APIService.execPOSTExistsDeviceId(deviceIdAPIData).then((resValue) => {
      if (resValue == undefined) {
        return;
      }
      if (!resValue) {
        movePage('/pl/error/');
        return;
      }
      setExistsDeviceId(true);
    });
  }, []);

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
        movePage('/pl/gameover/');
        return;
      }
      setIsAlivePlayer(true);
    });
  }, [existsDeviceId]);

  useEffect(() => {
    if (!isAlivePlayer) {
      return;
    }
    setWsService(
      new WsService(WsSenderType.PlayerSite, setWsIsOpen, setWsRcvData)
    );
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

  const nextState = wsRcvData.actionParameter01 as GameState;
  switch (nextState) {
    case GameState.Empty:
      break; // @todo
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
