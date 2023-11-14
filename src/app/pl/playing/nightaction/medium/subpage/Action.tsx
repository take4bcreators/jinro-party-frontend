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
        setPageFunc(RoleActionSubPage.Wait);
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
      <p>最後に処刑されたプレイヤーの役職を確認します</p>
      <p>
        <button type="button" onClick={handleButton}>
          OK
        </button>
      </p>
    </>
  );
}
