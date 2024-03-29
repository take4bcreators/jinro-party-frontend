'use client';
import Link from 'next/link';
import { GameMode } from '@/config/gameMode';
import { LocalStorageService } from '@/utils/localStorageService';

export default function Home(): JSX.Element {
  function saveMode(mode: GameMode) {
    LocalStorageService.setNewGameMode(mode);
  }

  return (
    <>
      <ul>
        <li>
          <Link
            href="/gm/newgame/confirm/"
            onClick={() => {
              saveMode(GameMode.Normal);
            }}
          >
            通常モード
          </Link>
        </li>
        <li>
          <Link href="/gm/">戻る</Link>
        </li>
      </ul>
    </>
  );
}
