'use client';
import { useEffect, useRef, useState } from 'react';
import { APIService } from '@/utils/apiService';
import { useRouter } from 'next/navigation';
import { GameState } from '@/config/gameState';
import { DeviceIdService } from '@/utils/deviceIdService';
import { APIWsData } from '@/types/apiWsData';
import { WsService } from '@/utils/wsService';
import { WsSenderType } from '@/config/wsSenderType';
import { WsRequestAction } from '@/config/wsRequestAction';
import Link from 'next/link';

export default function Home(): JSX.Element {
  const router = useRouter();
  const pageChange = useRef(false);
  const [gameState, setGameState] = useState<GameState | undefined>(undefined);
  const [wsRcvData, setWsRcvData] = useState<APIWsData | undefined>(undefined);
  const [wsIsOpen, setWsIsOpen] = useState(false);
  const [wsService, setWsService] = useState<WsService | undefined>(undefined);

  useEffect(() => {
    // デバイスIDの確認と生成
    DeviceIdService.registerIfNotExists();
    APIService.getGetGameState().then((state) => {
      if (state == undefined) {
        return;
      }
      setGameState(state);
    });
  }, []);

  useEffect(() => {
    if (gameState == undefined) {
      return;
    }
    if (gameState === GameState.PreGame) {
      return;
    }
    if (gameState === GameState.PlayerJoining) {
      return;
    }
    if (pageChange.current) {
      return;
    }
    router.push('/pl/continue/');
    pageChange.current = true;
  }, [gameState, router]);

  useEffect(() => {
    if (gameState == undefined) {
      return;
    }
    if (
      gameState !== GameState.PreGame &&
      gameState !== GameState.PlayerJoining
    ) {
      return;
    }
    if (pageChange.current) {
      return;
    }
    setWsService(
      new WsService(WsSenderType.PlayerSite, setWsIsOpen, setWsRcvData)
    );
  }, [gameState]);

  useEffect(() => {
    if (wsService == undefined) {
      return;
    }
    if (!wsIsOpen) {
      return;
    }
    wsService.getCurrentGameState();
  }, [wsService, wsIsOpen]);

  const loadScreen = (
    <>
      <h1>人狼パーティ</h1>
      <p>ロード中...</p>
    </>
  );
  const errorScreen = (
    <>
      <h1>募集画面</h1>
      <p>エラーが発生しました</p>
    </>
  );
  if (gameState == undefined) {
    return loadScreen;
  }
  if (pageChange.current) {
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

  switch (wsRcvData.actionParameter01) {
    case GameState.PreGame:
      return (
        <>
          <h1>人狼パーティ</h1>
          <p>募集前です...</p>
          <p>しばらくお待ちください</p>
        </>
      );
    case GameState.PlayerJoining:
      const deviceId = DeviceIdService.getToAPIData();
      APIService.postExistsEntryDeviceId(deviceId).then((exists) => {
        if (exists == undefined) {
          return;
        }
        if (!exists) {
          return;
        }
        router.push('/pl/entry/join/');
        pageChange.current = true;
      });
      return (
        <>
          <h1>人狼パーティ</h1>
          <p>
            <Link href="/pl/entry/input/">参加する</Link>
          </p>
        </>
      );
    default:
      break;
  }

  return loadScreen;
}
