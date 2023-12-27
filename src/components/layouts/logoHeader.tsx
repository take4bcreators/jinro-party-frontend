import Logo from '@/components/elements/logo';
import { LogoStyle } from '@/config/logoStyle';
import styles from '@/styles/components/layouts/logoHeader.module.scss';

export default function Home(): JSX.Element {
  return (
    <header>
      <h1 className={styles.header}>
        <Logo type={LogoStyle.Small} />
      </h1>
    </header>
  );
}
