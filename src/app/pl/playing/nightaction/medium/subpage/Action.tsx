import Button from '@/components/elements/button';
import PlayingFooter from '@/components/layouts/playingFooter';
import PlayingLayout from '@/components/layouts/playingLayout';
import { ButtonStyle } from '@/config/buttonStyle';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { PlayerRole } from '@/config/playerRole';
import { PlayingLayoutStyle } from '@/config/playingLayoutStyle';
import { RoleActionSubPage } from '@/config/roleActionSubPage';
import { APIService } from '@/utils/apiService';
import { DeviceIdService } from '@/utils/deviceIdService';
import { Dispatch, SetStateAction, useEffect } from 'react';
import styles from '@/styles/app/pl/playing/playing.module.scss';

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
    <PlayingLayout
      flexType={FlexBaseLayoutStyle.FooterCenter}
      type={PlayingLayoutStyle.Dark}
    >
      <div className={styles.headerTitle}>
        <p>霊能者アクション</p>
        <p>最後に処刑されたプレイヤーが人狼かどうかを確認します</p>
      </div>
      <ul className={styles.bottomButtons}>
        <li className={styles.bottomButtons__button_first}>
          <span onClick={handleButton}>
            <Button type={ButtonStyle.Purple}>OK</Button>
          </span>
        </li>
      </ul>
      <PlayingFooter />
    </PlayingLayout>
  );

  // return (
  //   <>
  //     <h1>霊能者アクション</h1>
  //     <p>最後に処刑されたプレイヤーが人狼かどうかを確認します</p>
  //     <p>
  //       <button type="button" onClick={handleButton}>
  //         OK
  //       </button>
  //     </p>
  //   </>
  // );
}
