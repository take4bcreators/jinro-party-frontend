import { useEffect, useState } from 'react';
import PlayerPanel from '@/components/elements/playerPanel';
import StateTitle from '@/components/elements/stateTitle';
import Timer from '@/components/elements/timer';
import PlayingLayout from '@/components/layouts/playingLayout';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { GameState } from '@/config/gameState';
import { PlayerIcon } from '@/config/playerIcon';
import { PlayerPanelStyle } from '@/config/playerPanelStyle';
import { PlayingLayoutStyle } from '@/config/playingLayoutStyle';
import { StateTitleStyle } from '@/config/stateTitleStyle';
import { TimerStyle } from '@/config/timerStyle';
import styles from '@/styles/app/mt/playing/playing.module.scss';
import { APIData } from '@/types/apiData';
import { TimerData } from '@/types/timerData';
import { APIService } from '@/utils/apiService';
import { PromiseUtil } from '@/utils/promiseUtil';

const DEBUG: boolean = false;
const THIS_GAME_STATE = GameState.ExileAnnouncement;

export default function Home(): JSX.Element {
  const [dropoutPlayer, setDropoutPlayer] = useState<
    APIData.APIPlayerBasicData | undefined
  >(undefined);
  const [timerData, setTimerData] = useState<TimerData | undefined>(undefined);

  useEffect(() => {
    (async () => {
      if (DEBUG) {
        const resData: APIData.APIPlayerBasicData = {
          deviceId: '000000',
          playerName: '太郎',
          playerIcon: 'Icon01',
        };
        setDropoutPlayer(resData);
        return;
      }
      const resData = await APIService.getFetchDropoutPlayer();
      if (resData == undefined) {
        return;
      }
      setDropoutPlayer(resData);
    })();
  }, []);

  useEffect(() => {
    PromiseUtil.apiAutoRetry(5, 300, async () => {
      const timerData = await APIService.getFetchTimerData();
      if (timerData == undefined) {
        return true;
      }
      if (timerData.gameState === THIS_GAME_STATE) {
        const timerCount = Math.floor(timerData.timeCountMSec * 0.001);
        setTimerData({
          timerState: timerData.timerState,
          timerCount: timerCount,
        });
        return true;
      }
      return false;
    });
  }, []);

  return (
    <PlayingLayout
      flexType={FlexBaseLayoutStyle.Default}
      type={PlayingLayoutStyle.Purple}
      bgDecoration={true}
    >
      <StateTitle type={StateTitleStyle.Purple} title={'Voting Result'} />
      {dropoutPlayer == undefined ? (
        <></>
      ) : (
        <PlayerPanel
          initPlayerName={dropoutPlayer.playerName}
          initPlayerIcon={dropoutPlayer.playerIcon as PlayerIcon}
          type={PlayerPanelStyle.Large}
        />
      )}
      <div className={styles.textFlexSet}>
        <p className={styles.textCenterSmall}>DROP OUT</p>
      </div>
      <p className={styles.textFixedRightBottom}>
        {timerData == undefined ? (
          <></>
        ) : (
          <Timer
            timerState={timerData.timerState}
            initialCount={timerData.timerCount}
            timerStyle={TimerStyle.Medium}
          />
        )}
      </p>
    </PlayingLayout>
  );
}
