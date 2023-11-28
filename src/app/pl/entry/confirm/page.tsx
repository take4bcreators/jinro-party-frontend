'use client';
import { GameState } from '@/config/gameState';
import { APIData } from '@/types/apiData';
import { APIService } from '@/utils/apiService';
import { DeviceIdService } from '@/utils/deviceIdService';
import { LocalStorageService } from '@/utils/localStorageService';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '@/components/elements/button';
import { ButtonStyle } from '@/config/buttonStyle';
import DarkForestLayout from '@/components/layouts/darkForestLayout';
import Logo from '@/components/elements/logo';
import { LogoStyle } from '@/config/logoStyle';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import styles from '@/styles/app/pl/entry/entry.module.scss';

export default function Home(): JSX.Element {
  const router = useRouter();
  const [playerName, setPlayerName] = useState('');
  const [playerIcon, setPlayerIcon] = useState('');
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    setPlayerName(LocalStorageService.getEntryPlayerName() ?? '');
    setPlayerIcon(LocalStorageService.getEntryPlayerIcon() ?? '');
  }, []);

  function LoadingScreen() {
    return (
      <DarkForestLayout flexType={FlexBaseLayoutStyle.Top}>
        <h1 className={styles.topLogo}>
          <Logo type={LogoStyle.Small} />
        </h1>
      </DarkForestLayout>
    );
  }

  if (playerName === '') {
    return <LoadingScreen />;
  }
  if (playerIcon === '') {
    return <LoadingScreen />;
  }

  async function saveAndMove() {
    const gameState = await APIService.getGetGameState();
    if (gameState == undefined) {
      return;
    }
    if (gameState !== GameState.PlayerJoining) {
      setErrorText('エラー：ゲーム状態確認でエラーが発生しました');
      return;
    }
    const deviceId = DeviceIdService.get();
    const playerData: APIData.APISendEntryPlayerData = {
      deviceId: deviceId,
      playerName: playerName,
      playerIcon: playerIcon,
    };
    const registResult = await APIService.postPlayerRegist(playerData);
    if (registResult == undefined) {
      return;
    }
    if (!registResult) {
      setErrorText('エラー：ユーザー登録時にエラーが発生しました');
      return;
    }
    router.push('/pl/entry/join/');
    return;
  }

  async function doCancel() {
    const deviceId = DeviceIdService.get();
    const playerData: APIData.APISendEntryPlayerData = {
      deviceId: deviceId,
      playerName: playerName,
      playerIcon: playerIcon,
    };
    const removeResult = await APIService.postPlayerRegistRemove(playerData);
    if (removeResult == undefined) {
      return;
    }
    if (!removeResult) {
      return;
    }
    router.push('/pl/entry/input/');
    return;
  }

  return (
    <DarkForestLayout flexType={FlexBaseLayoutStyle.Top}>
      <h1 className={styles.topLogo}>
        <Logo type={LogoStyle.Small} />
      </h1>
      <p>これでよろしいでしょうか？</p>
      <ul className={styles.confirm}>
        <li>{playerName}</li>
        <li>{playerIcon}</li>
      </ul>
      <p>{errorText}</p>
      <ul className={styles.bottomButtons}>
        <li className={styles.bottomButtons__button}>
          <span onClick={saveAndMove}>
            <Button type={ButtonStyle.Pink}>エントリー</Button>
          </span>
        </li>
        <li className={styles.bottomButtons__button}>
          <span onClick={doCancel}>
            <Button type={ButtonStyle.None}>戻る</Button>
          </span>
        </li>
      </ul>
    </DarkForestLayout>
  );
}
