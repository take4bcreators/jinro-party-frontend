import { useState, useEffect } from 'react';
import Logo from '@/components/elements/logo';
import DarkForestLayout from '@/components/layouts/darkForestLayout';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { LogoStyle } from '@/config/logoStyle';
import { PlayerTeam } from '@/config/playerTeam';
import { PlayerTeamSetting } from '@/config/playerTeamSetting';
import styles from '@/styles/app/mt/playing/playing.module.scss';
import { APIService } from '@/utils/apiService';

export default function Home(): JSX.Element {
  const [winningTeam, setWinningTeam] = useState<PlayerTeam | undefined>(
    undefined
  );

  useEffect(() => {
    (async () => {
      const resData = await APIService.getFetchWinningTeam();
      if (resData == undefined) {
        return;
      }
      setWinningTeam(resData);
    })();
  }, []);

  if (winningTeam == undefined) {
    return <></>;
  }

  // return (
  //   <>
  //     <p>
  //       <strong>{PlayerTeamSetting.TeamName.get(winningTeam)} 勝利！！</strong>
  //     </p>
  //   </>
  // );
  return (
    <DarkForestLayout flexType={FlexBaseLayoutStyle.Default}>
      <Logo type={LogoStyle.Default} />
      <p className={styles.textCenterMid}>
        {PlayerTeamSetting.TeamName.get(winningTeam)}
      </p>
      <p className={styles.textCenterMidSmall}>勝利</p>
    </DarkForestLayout>
  );
}
