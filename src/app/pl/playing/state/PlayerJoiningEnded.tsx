import DarkForestLayout from '@/components/layouts/darkForestLayout';
import LogoHeader from '@/components/layouts/logoHeader';
import PlayingFooter from '@/components/layouts/playingFooter';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { LogoStyle } from '@/config/logoStyle';
import styles from '@/styles/app/pl/playing/playing.module.scss';

export default function Home(): JSX.Element {
  return (
    <DarkForestLayout flexType={FlexBaseLayoutStyle.Top}>
      <LogoHeader />
      <div className={styles.flexInformation}>
        <p>
          ゲームマスターが
          <wbr />
          ゲームの設定を行っています。
        </p>
        <p>しばらくお待ちください...</p>
      </div>
      <PlayingFooter />
    </DarkForestLayout>
  );
}
