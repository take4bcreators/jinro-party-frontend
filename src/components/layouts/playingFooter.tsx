import Logo from '@/components/elements/logo';
import { LogoStyle } from '@/config/logoStyle';
import PlayerPanel from '@/components/elements/playerPanel';
import styles from '@/styles/components/layouts/playingFooter.module.scss';

export default function Home(): JSX.Element {
  return (
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
  );
}
