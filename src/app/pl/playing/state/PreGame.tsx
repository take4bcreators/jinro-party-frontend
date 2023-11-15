import Link from 'next/link';

export default function Home(): JSX.Element {
  return (
    <>
      <h1>人狼パーティ</h1>
      <p>ゲームが終了しました</p>
      <p>
        <Link href="/pl/">トップへ戻る</Link>
      </p>
    </>
  );
}
