'use client';
import { GameMode } from '@/config/gameMode';
import { GAME_MODE_TITLES } from '@/config/gameModeTitles';
import { GameState } from '@/config/gameState';
import { APIData } from '@/types/apiData';
import { APIService } from '@/utils/apiService';
import { LocalStorageService } from '@/utils/localStorageService';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home(): JSX.Element {
  const [gameMode, setGameMode] = useState<GameMode | undefined>(undefined);

  useEffect(() => {
    const mode = LocalStorageService.getNewGameMode();
    setGameMode(mode);
  }, []);

  if (gameMode == undefined) {
    return (
      <>
        <p>ロード中...</p>
      </>
    );
  }

  async function beforeMoveProcess() {
    const playerRemoveResult = await APIService.execGETExecAllPlayerRemove();
    if (playerRemoveResult == undefined) {
      console.error(
        'APIService.execGETExecAllPlayerRemove result is undefined'
      );
      return;
    }
    if (!playerRemoveResult) {
      console.error('APIService.execGETExecAllPlayerRemove result is false');
      return;
    }
    const entryRemoveResult = await APIService.execGETExecAllEntryRemove();
    if (entryRemoveResult == undefined) {
      console.error('APIService.execGETExecAllEntryRemove result is undefined');
      return;
    }
    if (!entryRemoveResult) {
      console.error('APIService.execGETExecAllEntryRemove result is false');
      return;
    }
    const newGmaeAPIData = LocalStorageService.getForPostNewGameMode();
    const saveModeResult = await APIService.execPOSTSaveNewGame(newGmaeAPIData);
    if (saveModeResult == undefined) {
      console.error('APIService.execPOSTSaveNewGame result is undefined');
      return;
    }
    if (!saveModeResult) {
      console.error('APIService.execPOSTSaveNewGame result is false');
      return;
    }
    const sendData: APIData.APISendGameState = {
      gameState: GameState.PlayerJoining,
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

  const gameModeTitle = GAME_MODE_TITLES.get(gameMode);
  return (
    <>
      <h1>{gameModeTitle}</h1>
      <p>募集を開始しますか？</p>
      <p>（途中のゲームがある場合は上書きされます）</p>
      <ul>
        <li>
          <Link href="/gm/joining/" onClick={beforeMoveProcess}>
            はい
          </Link>
        </li>
        <li>
          <Link href="/gm/newgame/modeselect/">戻る</Link>
        </li>
      </ul>
    </>
  );
}
