'use client';
import { useState, useEffect, useRef } from 'react';
import { APIService } from '@/utils/apiService';
import { GameState } from '@/config/gameState';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home(): JSX.Element {
  const router = useRouter();
  const [gameState, setGameState] = useState('');

  useEffect(() => {
    (async () => {
      const getGameState = await APIService.getGetGameState();
      if (getGameState == undefined) {
        return;
      }
      setGameState(getGameState);
      switch (getGameState) {
        case GameState.PlayerJoining:
          router.push('/gm/joining/');
          break;
        case GameState.PlayerJoiningEnded:
          router.push('/gm/setting/input/');
          break;
        default:
          break;
      }
    })();
  }, [router]);

  function LoadScreen(): JSX.Element {
    return (
      <>
        <h1>WOLFFICE</h1>
        <p>ロード中...</p>
      </>
    );
  }
  if (gameState === '') {
    return <LoadScreen />;
  }

  switch (gameState) {
    case GameState.PreGame:
      return (
        <>
          <h1>WOLFFICE</h1>
          <ul>
            <li>
              <Link href="/gm/newgame/modeselect/">新規ゲーム</Link>
            </li>
          </ul>
        </>
      );
    case GameState.PlayerJoining:
      return <LoadScreen />;
    case GameState.PlayerJoiningEnded:
      return <LoadScreen />;
    default:
      break;
  }

  return (
    <>
      <h1>WOLFFICE</h1>
      <ul>
        <li>
          <Link href="/gm/newgame/modeselect/">新規ゲーム</Link>
        </li>
        <li>
          <Link href="/gm/playing/">ゲーム再開</Link>
        </li>
      </ul>
    </>
  );
}
