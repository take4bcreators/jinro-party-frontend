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
    const [playerRemoveResult, entryRemoveResult] = await Promise.all([
      APIService.getExecAllPlayerRemove(),
      APIService.getExecAllEntryRemove(),
    ]);
    if (playerRemoveResult == undefined) {
      console.error('playerRemoveResult is undefined');
      return;
    }
    if (!playerRemoveResult) {
      console.error('playerRemoveResult is false');
      return;
    }
    if (entryRemoveResult == undefined) {
      console.error('entryRemoveResult is undefined');
      return;
    }
    if (!entryRemoveResult) {
      console.error('entryRemoveResult is false');
      return;
    }

    const newGmaeAPIData = LocalStorageService.getForPostNewGameMode();
    const saveModeResult = await APIService.postSaveNewGame(newGmaeAPIData);
    if (saveModeResult == undefined) {
      console.error('saveModeResult is undefined');
      return;
    }
    if (!saveModeResult) {
      console.error('saveModeResult is false');
      return;
    }

    const sendData: APIData.APISendGameState = {
      gameState: GameState.PlayerJoining,
    };
    const changeResult = await APIService.postChangeGameState(sendData);
    if (changeResult == undefined) {
      console.error('changeResult is undefined');
      return;
    }
    if (!changeResult) {
      console.error('changeResult is false');
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
