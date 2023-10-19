'use client';
import { useState, useEffect } from 'react';
import { APIService } from '@/utils/apiService';

export default function Home(): JSX.Element {
  const [gameState, setGameState] = useState('');

  useEffect(() => {
    APIService.execGETGameState().then((resValue) => {
      if (resValue == undefined) {
        return;
      }
      setGameState(resValue);
    });
  }, []);

  if (gameState === '') {
    return <></>;
  }
  console.log(gameState);

  return (
    <>
      <p>ゲームマスターサイトです</p>
    </>
  );
}
