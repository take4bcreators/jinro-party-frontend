'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home(): JSX.Element {
  // URLのパラメータを取得してそれぞれのページに遷移する
  // http://localhost:3000?site=pl
  const searchParams = useSearchParams();
  const site = searchParams.get('site');
  const router = useRouter();
  const [myLocation, setMyLocation] = useState<Location | null>(null);

  useEffect(() => {
    if (site === null) {
      return;
    }
    switch (site) {
      case 'pl':
        router.push('/pl/');
        break;
      case 'mt':
        router.push('/mt/playing/');
        break;
      case 'gm':
        router.push('/gm/');
        break;
      default:
        break;
    }
  }, [site, router]);

  useEffect(() => {
    setMyLocation(window.location);
  }, []);

  if (myLocation == null) {
    return <></>;
  }

  return (
    <main>
      <section>
        <h1>Jinro Party</h1>
        <p>人狼パーティプロジェクト</p>
      </section>
      <section>
        <ul>
          <li>
            <Link href="./?site=gm">GameMaster Site</Link>
          </li>
          <li>
            <Link href="./?site=mt">Monitor Site</Link>
          </li>
          <li>
            <Link href="./?site=pl">Player Site</Link>
          </li>
          <li>
            <Link href="/debug/timer">Timer Debug</Link>
          </li>
          <li>
            <Link href="/debug/timer2">Timer Debug2</Link>
          </li>
          <li>
            <Link href="/debug/timer3">Timer Debug3</Link>
          </li>
          <li>
            <Link href="/debug/timer4">Timer Debug4</Link>
          </li>
          <li>
            <Link href="/debug/qrcode">QRCode Debug</Link>
          </li>
          <li></li>
          <li>
            <Link href="/pl/playing/state">PL Playing Debug</Link>
          </li>
        </ul>
      </section>
      <section>
        <h1>DEBUG...</h1>
        <p>{myLocation.hostname}</p>
      </section>
    </main>
  );
}
