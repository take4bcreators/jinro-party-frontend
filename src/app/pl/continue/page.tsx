'use client';
import Link from 'next/link';

export default function Home(): JSX.Element {
  return (
    <>
      <h1>人狼パーティ</h1>
      <p>
        <Link href="/pl/playing/">ゲーム再開</Link>
      </p>
    </>
  );
}
