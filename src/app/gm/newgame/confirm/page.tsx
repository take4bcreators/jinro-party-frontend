'use client';
import { GameMode } from '@/config/gameMode';
import { GAME_MODE_TITLES } from '@/config/gameModeTitles';
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

  const gameModeTitle = GAME_MODE_TITLES.get(gameMode);
  return (
    <>
      <h1>{gameModeTitle}</h1>
      <p>募集を開始しますか？</p>
      <p>（途中のゲームがある場合は上書きされます）</p>
      <ul>
        <li>
          <Link href="/gm/joining/">はい</Link>
        </li>
        <li>
          <Link href="/gm/newgame/modeselect/">戻る</Link>
        </li>
      </ul>
    </>
  );
}
