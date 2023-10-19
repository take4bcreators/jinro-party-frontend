'use client';
import { useEffect, useState } from 'react';
import { makeAPIEndpointURL, execGETGameState } from '@/utils/api';
import { APIRouting } from '@/config/apiRouting';
import { useRouter } from 'next/navigation';

export default function Home(): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    // デバイスIDの確認と生成
    const deviceId = localStorage.getItem('jrpt_general_deviceid');
    if (deviceId == null) {
      const uuid = crypto.randomUUID();
      localStorage.setItem('jrpt_general_deviceid', uuid);
    }
  }, []);

  const [gameState, setGameState] = useState('');
  const [apiEndpointURL, setApiEndpointURL] = useState('');

  useEffect(() => {
    const endpointURL = makeAPIEndpointURL(APIRouting.Point.getGameState);
    setApiEndpointURL(endpointURL);
  }, []);

  useEffect(() => {
    execGETGameState(apiEndpointURL).then((resValue) => {
      if (resValue == undefined) {
        return;
      }
      setGameState(resValue);
    });
  }, [apiEndpointURL]);

  if (gameState === '') {
    return <></>;
  }

  if (gameState === 'PreGame') {
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
