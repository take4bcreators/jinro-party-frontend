'use client';
import Link from 'next/link';

export default function Home(): JSX.Element {
  return (
    <>
      <h1>人狼パーティ</h1>
      <p>エラーが発生しました</p>
      <p>
        <Link href="./?site=pl">戻る</Link>
      </p>
    </>
  );
}
