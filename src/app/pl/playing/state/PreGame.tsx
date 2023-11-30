import Link from 'next/link';

import DarkForestLayout from '@/components/layouts/darkForestLayout';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import styles from '@/styles/app/pl/playing/playing.module.scss';
import LogoHeader from '@/components/layouts/logoHeader';
import PlayingFooter from '@/components/layouts/playingFooter';

export default function Home(): JSX.Element {
  return (
    <DarkForestLayout flexType={FlexBaseLayoutStyle.Top}>
      <LogoHeader />
      <p>ゲームが終了しました</p>
      <p>
        <Link href="/pl/">トップへ戻る</Link>
      </p>
      <PlayingFooter />
    </DarkForestLayout>
  );
}
