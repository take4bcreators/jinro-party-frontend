'use client';

import { GameState } from '@/config/gameState';
import { WsSenderType } from '@/config/wsSenderType';
import { APIWsData } from '@/types/apiWsData';
import { APIService } from '@/utils/apiService';
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
    pagePushProgress.current = false;
  }, []);

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
    wsService.updateGameState(GameState.PlayerListDisplay);
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
    setPushPage('/gm/setting/input/');
  }

  async function moveNextPage() {
    const isSuccess = await APIService.execGETExecEntryRegist();
    if (isSuccess == undefined) {
      return;
    }
    if (!isSuccess) {
      return;
    }
    setUseWs(true);
    setPushPage('/gm/playing/');
  }

  return (
    <>
      <p>ゲーム設定画面...</p>
      <ul>
        <li>
          <span onClick={moveNextPage}>ゲーム開始</span>
        </li>
        <li>
          <span onClick={doCancel}>戻る</span>
        </li>
      </ul>
    </>
  );
}
