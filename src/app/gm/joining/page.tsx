'use client';
import { GameState } from '@/config/gameState';
import { WsRequestAction } from '@/config/wsRequestAction';
import { WsSenderType } from '@/config/wsSenderType';
import { APIWsData } from '@/types/apiWsData';
import { WsService } from '@/utils/wsService';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function Home(): JSX.Element {
  const router = useRouter();
  const pagePushProgress = useRef(false);
  const [pushPage, setPushPage] = useState('');
  const [wsRcvData, setWsRcvData] = useState<APIWsData | undefined>(undefined);
  const [wsIsOpen, setWsIsOpen] = useState(false);
  const [wsService, setWsService] = useState<WsService | undefined>(undefined);

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
    wsService.updateGameState(GameState.PlayerJoining);
  }, [wsService, wsIsOpen]);

  useEffect(() => {
    if (pagePushProgress.current) {
      return;
    }
    if (wsRcvData == undefined) {
      return;
    }
    if (wsRcvData.actionParameter01 !== GameState.PlayerJoiningEnded) {
      return;
    }
    setPushPage('/gm/setting/input/');
  }, [wsRcvData]);

  useEffect(() => {
    if (pagePushProgress.current) {
      return;
    }
    if (pushPage == '') {
      return;
    }
    if (router == undefined) {
      return;
    }
    router.push(pushPage);
    pagePushProgress.current = true;
  }, [pushPage, router]);

  const loadScreen = (
    <>
      <h1>募集画面</h1>
      <p>ロード中...</p>
    </>
  );
  const errorScreen = (
    <>
      <h1>募集画面</h1>
      <p>エラーが発生しました</p>
    </>
  );
  if (pagePushProgress.current) {
    return loadScreen;
  }
  if (wsRcvData == undefined) {
    return loadScreen;
  }
  if (wsService == undefined) {
    return loadScreen;
  }
  if (wsRcvData.requestAction !== WsRequestAction.GameScreenChange) {
    return errorScreen;
  }

  function endJoining() {
    if (wsService == undefined) {
      return;
    }
    wsService.updateGameState(GameState.PlayerJoiningEnded);
    return;
  }

  function doCancel() {
    if (wsService == undefined) {
      return;
    }
    wsService.updateGameState(GameState.PreGame);
    setPushPage('/gm/newgame/modeselect/');
    return;
  }

  if (wsRcvData.actionParameter01 === GameState.PlayerJoining) {
    return (
      <>
        <h1>募集画面</h1>
        <ul>
          <li>
            <span onClick={endJoining}>募集を締め切る</span>
          </li>
          <li>
            <span onClick={doCancel}>キャンセル</span>
          </li>
        </ul>
      </>
    );
  }

  return (
    <>
      <p>ロード中...</p>
    </>
  );
}
