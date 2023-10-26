'use client';

import { GameState } from '@/config/gameState';
import { WsSenderType } from '@/config/wsSenderType';
import { APIWsData } from '@/types/apiWsData';
import { WsService } from '@/utils/wsService';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function Home(): JSX.Element {
  const router = useRouter();
  const pagePushProgress = useRef(false);
  const [pushPage, setPushPage] = useState('');
  const [useWs, setUseWs] = useState(false);
  const [_wsRcvData, setWsRcvData] = useState<APIWsData | undefined>(undefined);
  const [wsIsOpen, setWsIsOpen] = useState(false);
  const [wsService, setWsService] = useState<WsService | undefined>(undefined);

  useEffect(() => {
    if (!useWs) {
      return;
    }
    setWsService(
      new WsService(WsSenderType.GameMasterSite, setWsIsOpen, setWsRcvData)
    );
  }, [useWs]);

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
    if (pushPage === '') {
      return;
    }
    router.push(pushPage);
    pagePushProgress.current = true;
  }, [pushPage, router]);

  function doCancel() {
    setUseWs(true);
    setPushPage('/gm/joining/');
  }

  function moveNextPage() {
    setPushPage('/gm/setting/confirm/');
  }

  return (
    <>
      <p>ゲーム設定画面...</p>
      <ul>
        <li>
          <span onClick={moveNextPage}>次へ</span>
        </li>
        <li>
          <span onClick={doCancel}>募集へ戻る</span>
        </li>
      </ul>
    </>
  );
}
