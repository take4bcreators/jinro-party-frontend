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
  const [pushPage, setPushPage] = useState<string>('');
  const wsOpening = useRef(false);
  const [wsRcvData, setWsRcvData] = useState<APIWsData | undefined>(undefined);
  const [wsIsOpen, setWsIsOpen] = useState(false);
  const [wsService, setWsService] = useState<WsService | undefined>(undefined);

  // WebSocket開始
  useEffect(() => {
    if (pagePushProgress.current) {
      return;
    }
    if (wsOpening.current) {
      return;
    }
    setWsService(
      new WsService(WsSenderType.PlayerSite, setWsIsOpen, setWsRcvData)
    );
    wsOpening.current = true;
  }, []);

  // ゲーム状態取得
  useEffect(() => {
    if (wsService == undefined) {
      return;
    }
    if (!wsIsOpen) {
      return;
    }
    wsService.getCurrentGameState();
  }, [wsService, wsIsOpen]);

  // ページ遷移
  useEffect(() => {
    if (pagePushProgress.current) {
      return;
    }
    if (pushPage === '') {
      return;
    }
    router.push(pushPage);
    pagePushProgress.current = true;
  }, [pushPage, router]);

  const loadScreen = (
    <>
      <h1>エントリー完了！</h1>
      <p>ロード中...</p>
    </>
  );
  const errorScreen = (
    <>
      <h1>エントリー完了！</h1>
      <p>エラーが発生しました</p>
    </>
  );
  if (pagePushProgress.current) {
    return loadScreen;
  }
  if (pushPage !== '') {
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

  function doCancel() {
    setPushPage('/pl/entry/input/');
    return;
  }

  switch (wsRcvData.actionParameter01) {
    case GameState.PlayerJoining:
      return (
        <>
          <h1>エントリー完了！</h1>
          <p>他のプレイヤーを待っています...</p>
          <ul>
            <li>
              <span onClick={doCancel}>キャンセルする</span>
            </li>
          </ul>
        </>
      );
    case GameState.PlayerJoiningEnded:
      setPushPage('/pl/playing/');
      return loadScreen;
    default:
      break;
  }

  return errorScreen;
}
