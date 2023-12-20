'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GameState } from '@/config/gameState';
import { APIData } from '@/types/apiData';
import { APIService } from '@/utils/apiService';

export default function Home(): JSX.Element {
  const router = useRouter();
  const [errorText, setErrorText] = useState('');

  async function stateChange(gameState: GameState) {
    const sendData: APIData.APISendGameState = {
      gameState: gameState,
    };
    const changeResult = await APIService.postChangeGameState(sendData);
    if (changeResult == undefined) {
      console.error('APIService.execPOSTChangeGameState result is undefined');
      return;
    }
    if (!changeResult) {
      console.error('APIService.execPOSTChangeGameState result is false');
      return;
    }
    return;
  }

  async function isMemberCountOK(): Promise<boolean> {
    const entryPlayers = await APIService.getFetchEntryPlayers();
    if (entryPlayers == undefined) {
      return false;
    }
    const length = entryPlayers.allData.length;
    if (length <= 2) {
      return false;
    }
    return true;
  }

  async function playerSave() {
    const result = await APIService.getExecEntryRegist();
    if (result == undefined) {
      console.error('APIService.execGETExecEntryRegist result is undefined');
      return;
    }
    if (!result) {
      console.error('APIService.execGETExecEntryRegist result is false');
      return;
    }
    return;
  }

  async function nextMoveProcess() {
    const isOK = await isMemberCountOK();
    if (!isOK) {
      const errMsg = 'メンバー締め切り条件に合いませんでした';
      setErrorText('！エラー：' + errMsg);
      return;
    }
    await stateChange(GameState.PlayerJoiningEnded);
    await playerSave();
    router.push('/gm/setting/input/');
    return;
  }

  async function cancelProcess() {
    await stateChange(GameState.PreGame);
  }

  return (
    <>
      <h1>募集画面</h1>
      <p>{errorText}</p>
      <ul>
        <li>
          <button onClick={nextMoveProcess}>募集を締め切る</button>
        </li>
        <li>
          <Link href="/gm/newgame/modeselect/" onClick={cancelProcess}>
            キャンセル
          </Link>
        </li>
      </ul>
    </>
  );
}
