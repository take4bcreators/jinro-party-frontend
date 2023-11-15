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
  const [isExecuter, setExecuter] = useState(true);
  const [selectPlayerId, setSelectPlayerId] = useState('');

  useEffect(() => {
    (async () => {
      const deviceId = DeviceIdService.getToAPIData();
      const checkResult = await APIService.postCheckWerewolfExecuter(deviceId);
      if (!checkResult) {
        setExecuter(false);
      }
      const resData = await APIService.getFetchAliversForWerewolf();
      if (resData == undefined) {
        return;
      }
      const targetPlayers = resData.allData;
      setPlayersData(targetPlayers);
    })();
  }, []);

  async function handlePassButton() {
    setPageFunc(RoleActionSubPage.Wait);
  }

  if (!isExecuter) {
    <>
      <h1>人狼アクション</h1>
      <p>襲撃は他のプレイヤーが行います。</p>
      <form>
        <p>
          <button type="button" onClick={handlePassButton}>
            OK
          </button>
        </p>
      </form>
    </>;
  }

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
    const result = await APIService.postExecWerewolfAction({
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
      <h1>人狼アクション</h1>
      <p>襲撃するプレイヤーを選んでください</p>
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
