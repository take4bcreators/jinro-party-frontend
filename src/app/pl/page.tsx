'use client';
import { useEffect, useState } from 'react';
import { APIService } from '@/utils/apiService';
import { useRouter } from 'next/navigation';
import { GameState } from '@/config/gameState';

export default function Home(): JSX.Element {
  const router = useRouter();
  const [gameState, setGameState] = useState('');
  useEffect(() => {
    // デバイスIDの確認と生成
    const deviceId = localStorage.getItem('jrpt_general_deviceid');
    if (deviceId == null) {
      const uuid = crypto.randomUUID();
      localStorage.setItem('jrpt_general_deviceid', uuid);
    }
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

  if (gameState === GameState.PreGame) {
    console.log('募集前');
    return (
      <>
        <h1>人狼パーティ</h1>
        <p>募集前です...</p>
        <p>しばらくお待ちください</p>
      </>
    );
  } else {
    console.log('ゲーム中');
    router.push('/pl/playing/');
  }

  return (
    <>
      <p>ロード中...</p>
    </>
  );
}
