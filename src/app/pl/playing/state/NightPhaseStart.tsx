import { PlayerState } from '@/config/playerState';
import { LocalStorageService } from '@/utils/localStorageService';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home(): JSX.Element {
  const router = useRouter();
  useEffect(() => {
    const playerState = LocalStorageService.getPlayingPlayerState();
    if (playerState === PlayerState.Dead) {
      // 脱落した場合は、ページを再読み込みし、
      // 脱落用のページへ進む
      router.refresh();
      return;
    }
  }, [router]);

  return (
    <>
      <h1>夜のフェーズ開始</h1>
    </>
  );
}
