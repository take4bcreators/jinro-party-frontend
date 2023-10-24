'use client';
import { useEffect, useState } from 'react';
import { APIService } from '@/utils/apiService';
import { useRouter } from 'next/navigation';
import { GameState } from '@/config/gameState';
import { DeviceIdService } from '@/utils/deviceIdService';

export default function Home(): JSX.Element {
  const router = useRouter();
  const [pageChange, setPageChange] = useState(false);
  const [gameState, setGameState] = useState('');

  useEffect(() => {
    // デバイスIDの確認と生成
    DeviceIdService.registerIfNotExists();
    APIService.execGETGameState().then((state) => {
      if (state == undefined) {
        return;
      }
      setGameState(state);
    });
  }, []);

  useEffect(() => {
    if (gameState !== GameState.PreGame) {
      console.log('ゲーム中');
      router.push('/pl/continue/');
      setPageChange(true);
    }
  }, [gameState, router]);

  if (gameState === '') {
    return (
      <>
        <p>ロード中...</p>
      </>
    );
  }
  if (pageChange) {
    return (
      <>
        <p>ロード中...</p>
      </>
    );
  }

  return (
    <>
      <h1>人狼パーティ</h1>
      <p>募集前です...</p>
      <p>しばらくお待ちください</p>
    </>
  );
}
