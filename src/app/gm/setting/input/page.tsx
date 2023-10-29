'use client';

import { GameState } from '@/config/gameState';
import { APIData } from '@/types/apiData';
import { APIService } from '@/utils/apiService';
import Link from 'next/link';

export default function Home(): JSX.Element {
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

  async function cancelProcess() {
    await stateChange(GameState.PlayerJoining);
  }

  return (
    <>
      <p>ゲーム設定画面...</p>
      <ul>
        <li>
          <Link href="/gm/setting/confirm/">次へ</Link>
        </li>
        <li>
          <Link href="/gm/joining/" onClick={cancelProcess}>
            募集へ戻る
          </Link>
        </li>
      </ul>
    </>
  );
}
