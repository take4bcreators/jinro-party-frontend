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
      const deviceId = DeviceIdService.getToAPIData();
      const resData = await APIService.postFetchOtherAlivePlayers(deviceId);
      if (resData == undefined) {
        return;
      }
      const targetPlayers = resData.allData;
      setPlayersData(targetPlayers);
    })();
  }, []);

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
    const result = await APIService.postExecEnqueteAction({
      deviceId: deviceId,
      receiverDeviceId: receiverPlayer.deviceId,
    });
    if (result == undefined) {
      return;
    }
    if (!result) {
      return;
    }
    setPageFunc(RoleActionSubPage.Wait);
  }

  return (
    <>
      <h1>狂人アクション</h1>
      <p>人狼だと思うプレイヤーを投票してください</p>
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
