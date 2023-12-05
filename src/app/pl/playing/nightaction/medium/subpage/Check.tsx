import Button from '@/components/elements/button';
import PlayingFooter from '@/components/layouts/playingFooter';
import PlayingLayout from '@/components/layouts/playingLayout';
import { ButtonStyle } from '@/config/buttonStyle';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { PlayerRole } from '@/config/playerRole';
import { PlayerRoleSetting } from '@/config/playerRoleSetting';
import { PlayingLayoutStyle } from '@/config/playingLayoutStyle';
import { RoleActionSubPage } from '@/config/roleActionSubPage';
import { APIData } from '@/types/apiData';
import { APIService } from '@/utils/apiService';
import { DeviceIdService } from '@/utils/deviceIdService';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from '@/styles/app/pl/playing/playing.module.scss';

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
    <PlayingLayout
      flexType={FlexBaseLayoutStyle.FooterCenter}
      type={PlayingLayoutStyle.Dark}
    >
      <div className={styles.headerTitle}>
        <p>霊能者アクション</p>
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
      </div>
      <ul className={styles.bottomButtons}>
        <li className={styles.bottomButtons__button_first}>
          <span onClick={buttonHandler}>
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
  //     <p>
  //       {receivePlayer.playerName} さんは{' '}
  //       <strong>
  //         人狼{' '}
  //         {receivePlayer.playerRole === PlayerRole.Werewolf
  //           ? 'です'
  //           : 'ではありません'}
  //       </strong>{' '}
  //       です
  //     </p>
  //     <p>
  //       <button type="button" onClick={buttonHandler}>
  //         OK
  //       </button>
  //     </p>
  //   </>
  // );
}
