import Logo from '@/components/elements/logo';
import DarkForestLayout from '@/components/layouts/darkForestLayout';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { LogoStyle } from '@/config/logoStyle';
import styles from '@/styles/app/mt/playing/playing.module.scss';

export default function Home(): JSX.Element {
  return (
    <DarkForestLayout flexType={FlexBaseLayoutStyle.Default}>
      <Logo type={LogoStyle.Default} />
      <p className={styles.textUnderInformation}>募集を締め切りました</p>
      <p className={styles.textUnderInformationMid}>
        ゲームマスターがゲーム設定を行っています...
      </p>
    </DarkForestLayout>
  );
}
