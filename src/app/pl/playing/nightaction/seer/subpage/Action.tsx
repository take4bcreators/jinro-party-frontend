import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import Button from '@/components/elements/button';
import VotingList from '@/components/elements/votingList';
import PlayingFooter from '@/components/layouts/playingFooter';
import PlayingLayout from '@/components/layouts/playingLayout';
import { ButtonStyle } from '@/config/buttonStyle';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { PlayerRole } from '@/config/playerRole';
import { PlayerRoleSetting } from '@/config/playerRoleSetting';
import { PlayingLayoutStyle } from '@/config/playingLayoutStyle';
import { RoleActionSubPage } from '@/config/roleActionSubPage';
import styles from '@/styles/app/pl/playing/playing.module.scss';
import { APIData } from '@/types/apiData';
import { APIService } from '@/utils/apiService';
import { DeviceIdService } from '@/utils/deviceIdService';

type Props = {
  setPageFunc: Dispatch<SetStateAction<RoleActionSubPage>>;
};

export default function Home({ setPageFunc }: Props): JSX.Element {
  const [playersData, setPlayersData] = useState<
    APIData.APIPlayerBasicData[] | undefined
  >(undefined);
  const [selectPlayerId, setSelectPlayerId] = useState('');

  useEffect(() => {
    (async () => {
      const deviceId = DeviceIdService.getToAPIData();
      const existsData = await APIService.postExistsNightActionData(deviceId);
      if (existsData == undefined) {
        return;
      }
      if (existsData) {
        setPageFunc(RoleActionSubPage.Check);
        return;
      }
      const resData = await APIService.postFetchOtherAlivePlayers(deviceId);
      if (resData == undefined) {
        return;
      }
      const seerTargetPlayers = resData.allData;
      setPlayersData(seerTargetPlayers);
    })();
  }, [setPageFunc]);

  if (playersData == undefined) {
    return <></>;
  }

  function handleOptionChange(event: ChangeEvent<HTMLInputElement>) {
    setSelectPlayerId(event.target.value);
  }

  async function handleButton() {
    if (selectPlayerId === '') {
      return;
    }
    if (playersData == undefined) {
      return;
    }
    const deviceId = DeviceIdService.get();
    const receiverPlayer = playersData.find(
      (e) => e.deviceId === selectPlayerId
    );
    if (receiverPlayer == undefined) {
      return;
    }
    const result = await APIService.postExecSeerAction({
      deviceId: deviceId,
      receiverDeviceId: receiverPlayer.deviceId,
    });
    if (result == undefined) {
      return;
    }
    if (!result) {
      return;
    }
    setPageFunc(RoleActionSubPage.Check);
  }

  const roleName = PlayerRoleSetting.RoleName.get(PlayerRole.Seer);

  return (
    <PlayingLayout
      flexType={FlexBaseLayoutStyle.Top}
      type={PlayingLayoutStyle.Dark}
    >
      <div className={styles.headerTitle}>
        <p>{roleName}アクション</p>
        <p>
          役職を知りたいプレイヤーを
          <wbr />
          選択してください
        </p>
      </div>
      <form>
        <ul>
          <VotingList
            playerList={playersData}
            selectPlayerId={selectPlayerId}
            selectEvent={handleOptionChange}
          />
        </ul>
        <ul className={styles.bottomButtons}>
          <li className={styles.bottomButtons__button_first}>
            {selectPlayerId === '' ? (
              <Button type={ButtonStyle.Disable}>OK</Button>
            ) : (
              <span onClick={handleButton}>
                <Button type={ButtonStyle.Purple}>OK</Button>
              </span>
            )}
          </li>
        </ul>
      </form>
      <PlayingFooter useRoleCheck={true} useLogoLink={true} />
    </PlayingLayout>
  );
}
