'use client';

import QRCode from '@/components/elements/qrcode';

export default function Home(): JSX.Element {
  const selfURL = 'http//localhost:3000/';
  if (selfURL == undefined) {
    return <></>;
  }
  return (
    <>
      <h1>WOLFFICE</h1>
      <p>QRコードを読み取ってください</p>
      <main className="text-lg">
        <QRCode url={selfURL} />
      </main>
    </>
  );
}
