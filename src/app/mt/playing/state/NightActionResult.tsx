import { useEffect, useState } from 'react';
import StateTitle from '@/components/elements/stateTitle';
import PlayingLayout from '@/components/layouts/playingLayout';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { PlayingLayoutStyle } from '@/config/playingLayoutStyle';
import { StateTitleStyle } from '@/config/stateTitleStyle';
import styles from '@/styles/app/mt/playing/playing.module.scss';
import { APIData } from '@/types/apiData';
import { APIService } from '@/utils/apiService';

export default function Home(): JSX.Element {
  const [dropoutPlayer, setDropoutPlayer] = useState<
    APIData.APIPlayerBasicData | undefined
  >(undefined);

  useEffect(() => {
    (async () => {
      const resData = await APIService.getFetchDropoutPlayer();
      if (resData == undefined) {
        return;
      }
      setDropoutPlayer(resData);
    })();
  }, []);

  if (dropoutPlayer == undefined) {
    return <></>;
  }

  if (dropoutPlayer.deviceId === '') {
    // return (
    //   <>
    //     <section>
    //       <h1>朝になると...</h1>
    //       <p>昨夜の犠牲者は...</p>
    //       <p>
    //         <strong>いませんでした</strong>
    //       </p>
    //     </section>
    //   </>
    // );
    return (
      <PlayingLayout
        flexType={FlexBaseLayoutStyle.Default}
        type={PlayingLayoutStyle.Red}
        bgDecoration={true}
      >
        <StateTitle type={StateTitleStyle.Red} title={'Morning Result'}>
          昨夜の犠牲者は...
        </StateTitle>
        <p className={styles.textCenterMidSmall}>いませんでした</p>
      </PlayingLayout>
    );
  }

  // return (
  //   <>
  //     <section>
  //       <h1>朝になると...</h1>
  //       <p>昨夜の犠牲者は...</p>
  //       <p>{dropoutPlayer.playerName}</p>
  //       <p>{dropoutPlayer.playerIcon}</p>
  //     </section>
  //   </>
  // );
  return (
    <PlayingLayout
      flexType={FlexBaseLayoutStyle.Default}
      type={PlayingLayoutStyle.Red}
      bgDecoration={true}
    >
      <StateTitle type={StateTitleStyle.Red} title={'Morning Result'}>
        昨夜の犠牲者は...
      </StateTitle>
      <p>{dropoutPlayer.playerName}</p>
      <p>{dropoutPlayer.playerIcon}</p>
      <div className={styles.textFlexSet}>
        <p className={styles.textCenterMid}>DROP OUT</p>
      </div>
    </PlayingLayout>
  );
}
