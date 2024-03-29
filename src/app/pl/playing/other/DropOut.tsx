import DarkForestLayout from '@/components/layouts/darkForestLayout';
import LogoHeader from '@/components/layouts/logoHeader';
import PlayingFooter from '@/components/layouts/playingFooter';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import styles from '@/styles/app/pl/playing/playing.module.scss';

export default function Home(): JSX.Element {
  return (
    <DarkForestLayout flexType={FlexBaseLayoutStyle.Top}>
      <LogoHeader />
      <div className={styles.topInformation}>
        <p>脱落しました</p>
        <p>
          ゲームが終了するまで
          <wbr />
          お待ちください...
        </p>
      </div>
      <PlayingFooter useRoleCheck={true} useLogoLink={true} />
    </DarkForestLayout>
  );
}
