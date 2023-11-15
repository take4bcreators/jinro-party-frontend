import { PlayerRole } from '@/config/playerRole';
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
    APIData.APIReplyPlayerData | undefined | null
  >(undefined);

  useEffect(() => {
    (async () => {
      const deviceId = DeviceIdService.getToAPIData();
      const resData = await APIService.postFetchNightActionData(deviceId);
      if (resData == undefined) {
        setReceivePlayer(null);
        return;
      }
      setReceivePlayer(resData);
    })();
  }, []);

  if (receivePlayer === undefined) {
    return <></>;
  }

  function buttonHandler() {
    setPageFunc(RoleActionSubPage.Wait);
  }

  if (receivePlayer === null) {
    return (
      <>
        <h1>霊能者アクション</h1>
        <p>最後の処刑されたプレイヤーを確認できませんでした</p>
        <p>
          <button type="button" onClick={buttonHandler}>
            OK
          </button>
        </p>
      </>
    );
  }

  return (
    <>
      <h1>霊能者アクション</h1>
      <p>
        {receivePlayer.playerName} さんは{' '}
        <strong>
          人狼{' '}
          {receivePlayer.playerRole === PlayerRole.Werewolf
            ? 'です'
            : 'ではありません'}
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
