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
    const changeResult = await APIService.execPOSTChangeGameState(sendData);
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

  async function beforeMoveProcess() {
    await stateChange(GameState.PlayerJoiningEnded);
    return;
  }

  async function cancelProcess() {
    await stateChange(GameState.PreGame);
  }

  return (
    <>
      <h1>募集画面</h1>
      <ul>
        <li>
          <Link href="/gm/setting/input/" onClick={beforeMoveProcess}>
            募集を締め切る
          </Link>
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
