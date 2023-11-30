'use client';
import { GameState } from '@/config/gameState';
import { WsRequestAction } from '@/config/wsRequestAction';
import { WsSenderType } from '@/config/wsSenderType';
import { APIWsData } from '@/types/apiWsData';
import { WsService } from '@/utils/wsService';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Button from '@/components/elements/button';
import { ButtonStyle } from '@/config/buttonStyle';
import DarkForestLayout from '@/components/layouts/darkForestLayout';
import Logo from '@/components/elements/logo';
import { LogoStyle } from '@/config/logoStyle';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import styles from '@/styles/app/pl/entry/entry.module.scss';
import PlayerPanel from '@/components/elements/playerPanel';
import { PlayerPanelDataSrc } from '@/config/playerPanelDataSrc';

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

  type LoadingScreenProps = {
    message?: string;
  };

  function LoadingScreen({ message }: LoadingScreenProps) {
    return (
      <DarkForestLayout flexType={FlexBaseLayoutStyle.Top}>
        <h1 className={styles.topLogo}>
          <Logo type={LogoStyle.Small} />
        </h1>
        {message != undefined ? <p>{message}</p> : <></>}
      </DarkForestLayout>
    );
  }

  if (pagePushProgress.current) {
    return <LoadingScreen />;
  }
  if (pushPage !== '') {
    return <LoadingScreen />;
  }
  if (wsRcvData == undefined) {
    return <LoadingScreen />;
  }
  if (wsService == undefined) {
    return <LoadingScreen />;
  }
  if (wsRcvData.requestAction !== WsRequestAction.GameScreenChange) {
    return <LoadingScreen message={'エラーが発生しました'} />;
  }

  function doCancel() {
    setPushPage('/pl/entry/input/');
    return;
  }

  switch (wsRcvData.actionParameter01) {
    case GameState.PlayerJoining:
      return (
        <DarkForestLayout flexType={FlexBaseLayoutStyle.Top}>
          <h1 className={styles.topLogo}>
            <Logo type={LogoStyle.Small} />
          </h1>
          <p>エントリー完了！</p>
          <ul className={styles.playerPanel}>
            <li className={styles.playerPanel__panel}>
              <PlayerPanel dataSrc={PlayerPanelDataSrc.Entry} />
            </li>
          </ul>
          <p>他のプレイヤーを待っています...</p>
          <ul className={styles.bottomButtons}>
            <li className={styles.bottomButtons__button_first}>
              <span onClick={doCancel}>
                <Button type={ButtonStyle.None}>キャンセルする</Button>
              </span>
            </li>
          </ul>
        </DarkForestLayout>
      );
    case GameState.PlayerJoiningEnded:
      setPushPage('/pl/playing/');
      return <LoadingScreen />;
    default:
      break;
  }

  return <LoadingScreen message={'エラーが発生しました'} />;
}
