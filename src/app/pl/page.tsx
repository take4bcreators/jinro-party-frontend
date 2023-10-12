'use client';
import { useEffect } from 'react';

export default function Home(): JSX.Element {
  useEffect(() => {
    // デバイスIDの確認と生成
    const deviceId = localStorage.getItem('jrpt_general_deviceid');
    if (deviceId == null) {
      const uuid = crypto.randomUUID();
      localStorage.setItem('jrpt_general_deviceid', uuid);
    }
  }, []);

  return (
    <>
      <p>プレイヤーサイトです</p>
    </>
  );
}
