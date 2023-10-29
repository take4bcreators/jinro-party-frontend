'use client';
import { GameState } from '@/config/gameState';
import { APIData } from '@/types/apiData';
import { APIService } from '@/utils/apiService';
import { DeviceIdService } from '@/utils/deviceIdService';
import { LocalStorageService } from '@/utils/localStorageService';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home(): JSX.Element {
  const router = useRouter();
  const [playerName, setPlayerName] = useState('');
  const [playerIcon, setPlayerIcon] = useState('');
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    setPlayerName(LocalStorageService.getEntryPlayerName() ?? '');
    setPlayerIcon(LocalStorageService.getEntryPlayerIcon() ?? '');
  }, []);

  if (playerName === '') {
    return <></>;
  }
  if (playerIcon === '') {
    return <></>;
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
    <>
      <h1>確認画面</h1>
      <p>これでよろしいでしょうか？</p>
      <ul>
        <li>{playerName}</li>
        <li>{playerIcon}</li>
      </ul>
      <p>{errorText}</p>
      <ul>
        <li>
          <span onClick={saveAndMove}>ゲームへ参加</span>
        </li>
        <li>
          <span onClick={doCancel}>戻る</span>
        </li>
      </ul>
    </>
  );
}
