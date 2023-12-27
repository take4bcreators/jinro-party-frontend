import { useEffect, useState } from 'react';
import PlayerPanel from '@/components/elements/playerPanel';
import StateTitle from '@/components/elements/stateTitle';
import PlayingLayout from '@/components/layouts/playingLayout';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { PlayerIcon } from '@/config/playerIcon';
import { PlayerPanelStyle } from '@/config/playerPanelStyle';
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

  return (
    <PlayingLayout
      flexType={FlexBaseLayoutStyle.Default}
      type={PlayingLayoutStyle.Red}
      bgDecoration={true}
    >
      <StateTitle type={StateTitleStyle.Red} title={'Morning Result'}>
        昨夜の犠牲者は...
      </StateTitle>
      <PlayerPanel
        initPlayerName={dropoutPlayer.playerName}
        initPlayerIcon={dropoutPlayer.playerIcon as PlayerIcon}
        type={PlayerPanelStyle.Large}
      />
      <div className={styles.textFlexSet}>
        <p className={styles.textCenterSmall}>DROP OUT</p>
      </div>
    </PlayingLayout>
  );
}
