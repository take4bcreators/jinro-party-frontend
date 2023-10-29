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
  const [wsService, setWsService] = useState<WsService | undefined>(undefined);
  const [wsRcvData, setWsRcvData] = useState<APIWsData | undefined>(undefined);
  const [wsIsOpen, setWsIsOpen] = useState(false);
  const pagePushProgress = useRef(false);
  const [pushPage, setPushPage] = useState('');

  function movePage(page: string) {
    setPushPage(page);
    pagePushProgress.current = true;
  }

  useEffect(() => {
    (async () => {
      const deviceIdAPIData = DeviceIdService.getToAPIData();
      const [deviceExists, playerAlive] = await Promise.all([
        APIService.postExistsDeviceId(deviceIdAPIData),
        APIService.postCheckPlayerAlive(deviceIdAPIData),
      ]);
      if (deviceExists == undefined) {
        return;
      }
      if (playerAlive == undefined) {
        return;
      }
      if (!deviceExists) {
        movePage('/pl/error/');
        return;
      }
      if (!playerAlive) {
        movePage('/pl/gameover/');
        return;
      }
      setWsService(
        new WsService(WsSenderType.PlayerSite, setWsIsOpen, setWsRcvData)
      );
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
