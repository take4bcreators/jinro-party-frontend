import { PlayerRoleSetting } from '@/config/playerRoleSetting';
import { RoleActionSubPage } from '@/config/roleActionSubPage';
import { APIData } from '@/types/apiData';
import { APIService } from '@/utils/apiService';
import { DeviceIdService } from '@/utils/deviceIdService';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type Props = {
  setPageFunc: Dispatch<SetStateAction<RoleActionSubPage>>;
};

export default function Home({ setPageFunc }: Props): JSX.Element {
  const [receivePlayer, setReceivePlayer] = useState<
    APIData.APIReplyPlayerData | undefined
  >(undefined);

  useEffect(() => {
    (async () => {
      const deviceId = DeviceIdService.getToAPIData();
      const resData = await APIService.postFetchNightActionData(deviceId);
      if (resData == undefined) {
        return;
      }
      setReceivePlayer(resData);
    })();
  }, []);

  if (receivePlayer == undefined) {
    return <></>;
  }

  function buttonHandler() {
    setPageFunc(RoleActionSubPage.Wait);
  }

  return (
    <>
      <h1>占い師アクション</h1>
      <p>
        {receivePlayer.playerName} さんは{' '}
        <strong>
          {PlayerRoleSetting.RoleName.get(receivePlayer.playerRole)}
        </strong>{' '}
        です
      </p>
      <p>
        <button type="button" onClick={buttonHandler}>
          OK
        </button>
      </p>
    </>
  );
}
