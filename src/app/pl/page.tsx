'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/elements/button';
import Logo from '@/components/elements/logo';
import DarkForestLayout from '@/components/layouts/darkForestLayout';
import { ButtonStyle } from '@/config/buttonStyle';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { GameState } from '@/config/gameState';
import { LogoStyle } from '@/config/logoStyle';
import { WsRequestAction } from '@/config/wsRequestAction';
import { WsSenderType } from '@/config/wsSenderType';
import styles from '@/styles/app/pl/page.module.scss';
import { APIWsData } from '@/types/apiWsData';
import { APIService } from '@/utils/apiService';
import { DeviceIdService } from '@/utils/deviceIdService';
import { WsService } from '@/utils/wsService';

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
    <DarkForestLayout flexType={FlexBaseLayoutStyle.Default}>
      <Logo type={LogoStyle.Default} />
      <p>ロード中...</p>
    </DarkForestLayout>
  );
  const errorScreen = (
    <DarkForestLayout flexType={FlexBaseLayoutStyle.Default}>
      <h1>募集画面</h1>
      <p>エラーが発生しました</p>
    </DarkForestLayout>
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
        <DarkForestLayout flexType={FlexBaseLayoutStyle.Default}>
          <Logo type={LogoStyle.Default} />
          <p>
            ゲーム開始まで
            <wbr />
            お待ちください...
          </p>
        </DarkForestLayout>
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
        <DarkForestLayout flexType={FlexBaseLayoutStyle.Default}>
          <Logo type={LogoStyle.Default} />
          <Link href="/pl/entry/input/">
            <Button type={ButtonStyle.Blue}>参加する</Button>
          </Link>
        </DarkForestLayout>
      );
    default:
      break;
  }

  return loadScreen;
}
