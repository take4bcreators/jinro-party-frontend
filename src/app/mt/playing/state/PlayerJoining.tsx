'use client';

import QRCode from '@/components/elements/qrcode';
import { useEffect, useState } from 'react';

export default function Home(): JSX.Element {
  const [playerSite, setPlayerSite] = useState<string | undefined>(undefined);
  useEffect(() => {
    let host = process.env.NEXT_PUBLIC_SELF_HOSTNAME;
    if (host == undefined || host === '') {
      host = window.location.hostname;
    }
    let port = process.env.NEXT_PUBLIC_SELF_PORT;
    if (port == undefined || port === '') {
      port = '3000';
    }
    setPlayerSite(`http://${host}:${port}/pl/`);
  }, []);

  if (playerSite == undefined) {
    return <></>;
  }
  return (
    <>
      <h1>WOLFFICE</h1>
      <p>QRコードを読み取ってください</p>
      <main className="text-lg">
        <QRCode url={playerSite} />
      </main>
    </>
  );
}
