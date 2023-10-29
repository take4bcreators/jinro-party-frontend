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

  async function beforeMoveNextProcess() {
    await stateChange(GameState.PlayerListDisplay);
    // 将来的にはここに設定更新POST実行を入れる
    return;
  }

  return (
    <>
      <p>ゲーム設定画面...</p>
      <ul>
        <li>
          <Link href="/gm/playing/" onClick={beforeMoveNextProcess}>
            ゲーム開始
          </Link>
        </li>
        <li>
          <Link href="/gm/setting/input/">戻る</Link>
        </li>
      </ul>
    </>
  );
}
