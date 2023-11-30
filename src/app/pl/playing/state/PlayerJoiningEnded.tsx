import DarkForestLayout from '@/components/layouts/darkForestLayout';
import Logo from '@/components/elements/logo';
import { LogoStyle } from '@/config/logoStyle';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import PlayerPanel from '@/components/elements/playerPanel';
import styles from '@/styles/app/pl/playing/playing.module.scss';

export default function Home(): JSX.Element {
  return (
    <DarkForestLayout flexType={FlexBaseLayoutStyle.Top}>
      <h1 className={styles.topLogo}>
        <Logo type={LogoStyle.Small} />
      </h1>
      <div className={styles.topInformation}>
        <p>ゲームマスターがゲームの設定を行っています。</p>
        <p>しばらくお待ちください...</p>
      </div>
      <footer className={styles.footer}>
        <ul className={styles.footer__flexwrapper}>
          <li>
            <PlayerPanel />
          </li>
          <li>
            <Logo type={LogoStyle.FixedSmall} />
          </li>
        </ul>
      </footer>
    </DarkForestLayout>
  );
}
