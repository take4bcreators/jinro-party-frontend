import DarkForestLayout from '@/components/layouts/darkForestLayout';
import LogoHeader from '@/components/layouts/logoHeader';
import PlayingFooter from '@/components/layouts/playingFooter';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import styles from '@/styles/app/pl/playing/playing.module.scss';

export default function Home(): JSX.Element {
  return (
    <DarkForestLayout flexType={FlexBaseLayoutStyle.Top}>
      <LogoHeader />
      <h1>ゲーム終了</h1>
      <PlayingFooter useRoleCheck={true} useLogoLink={true} />
    </DarkForestLayout>
  );
}
