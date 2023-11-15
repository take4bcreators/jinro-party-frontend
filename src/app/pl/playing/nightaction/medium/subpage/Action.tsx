import { RoleActionSubPage } from '@/config/roleActionSubPage';
import { APIService } from '@/utils/apiService';
import { DeviceIdService } from '@/utils/deviceIdService';
import { Dispatch, SetStateAction, useEffect } from 'react';

type Props = {
  setPageFunc: Dispatch<SetStateAction<RoleActionSubPage>>;
};

export default function Home({ setPageFunc }: Props): JSX.Element {
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
    })();
  }, [setPageFunc]);

  async function handleButton() {
    const deviceId = DeviceIdService.get();
    const result = await APIService.postExecMediumAction({
      deviceId: deviceId,
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
      <h1>霊能者アクション</h1>
      <p>最後に処刑されたプレイヤーが人狼かどうかを確認します</p>
      <p>
        <button type="button" onClick={handleButton}>
          OK
        </button>
      </p>
    </>
  );
}
