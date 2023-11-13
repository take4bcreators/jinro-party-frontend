import { RoleActionSubPage } from '@/config/roleActionSubPage';
import { APIData } from '@/types/apiData';
import { APIService } from '@/utils/apiService';
import { DeviceIdService } from '@/utils/deviceIdService';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

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
      const sendDeviceId = DeviceIdService.getToAPIData();
      const existsData = await APIService.postExistsNightActionData(
        sendDeviceId
      );
      if (existsData == undefined) {
        return;
      }
      if (existsData) {
        setPageFunc(RoleActionSubPage.Check);
        return;
      }
      const resData = await APIService.postFetchOtherAlivePlayers(sendDeviceId);
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
    const seerDeviceId = DeviceIdService.get();
    const receiverPlayer = playersData.find(
      (e) => e.deviceId === selectPlayerId
    );
    if (receiverPlayer == undefined) {
      return;
    }
    const result = await APIService.postExecSeerAction({
      seerDeviceId: seerDeviceId,
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

  return (
    <>
      <p>占いたいプレイヤーを選択してください</p>
      <form>
        <ul>
          {playersData.map((player, index) => {
            return (
              <li key={index}>
                <label>
                  <input
                    type="radio"
                    value={player.deviceId}
                    checked={selectPlayerId === player.deviceId}
                    onChange={handleOptionChange}
                  />
                  {player.playerIcon}:{player.playerName}
                </label>
              </li>
            );
          })}
        </ul>
        <p>
          <button
            type="button"
            disabled={selectPlayerId === ''}
            onClick={handleButton}
          >
            OK
          </button>
        </p>
      </form>
    </>
  );
}
