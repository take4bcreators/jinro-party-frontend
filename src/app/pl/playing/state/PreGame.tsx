import Link from 'next/link';

import DarkForestLayout from '@/components/layouts/darkForestLayout';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import styles from '@/styles/app/pl/playing/playing.module.scss';
import LogoHeader from '@/components/layouts/logoHeader';
import PlayingFooter from '@/components/layouts/playingFooter';
import Button from '@/components/elements/button';
import { ButtonStyle } from '@/config/buttonStyle';

export default function Home(): JSX.Element {
  return (
    <DarkForestLayout flexType={FlexBaseLayoutStyle.FooterCenter}>
      <LogoHeader />
      <p>ゲームが終了しました</p>
      <ul>
        <li>
          <Link href="/pl/">
            <Button type={ButtonStyle.Blue}>トップへ戻る</Button>
          </Link>
        </li>
      </ul>
      <PlayingFooter />
    </DarkForestLayout>
  );
}
