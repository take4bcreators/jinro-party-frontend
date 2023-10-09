'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function Home(): JSX.Element {
  // URLのパラメータを取得してそれぞれのページに遷移する
  // http://localhost:3000?site=pl
  const searchParams = useSearchParams();
  const site = searchParams.get('site');
  const router = useRouter();

  useEffect(() => {
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
  }, []);

  return (
    <main>
      <h1>Jinro Party</h1>
      <p>人狼パーティプロジェクト</p>
    </main>
  );
}
