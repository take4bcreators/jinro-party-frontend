'use client';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/elements/button';
import PlayerIconElemList from '@/components/elements/playerIconElemList';
import PlayerNameInput from '@/components/elements/playerNameInput';
import DarkForestLayout from '@/components/layouts/darkForestLayout';
import LogoHeader from '@/components/layouts/logoHeader';
import { ButtonStyle } from '@/config/buttonStyle';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { PlayerIcon } from '@/config/playerIcon';
import styles from '@/styles/app/pl/entry/entry.module.scss';
import { APIData } from '@/types/apiData';
import { APIService } from '@/utils/apiService';
import { DeviceIdService } from '@/utils/deviceIdService';
import { LocalStorageService } from '@/utils/localStorageService';

export default function Home(): JSX.Element {
  const router = useRouter();
  const statingPost = useRef(false);
  const [playerName, setPlayerName] = useState('');
  const [playerIcon, setPlayerIcon] = useState('');
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    setPlayerName(LocalStorageService.getEntryPlayerName() ?? '');
    setPlayerIcon(LocalStorageService.getEntryPlayerIcon() ?? '');
  }, []);

  useEffect(() => {
    if (statingPost.current) {
      return;
    }
    const deviceId = DeviceIdService.getToAPIData();
    APIService.postPlayerRegistRemove(deviceId);
    statingPost.current = true;
  }, []);

  function handleOptionChange(event: ChangeEvent<HTMLInputElement>) {
    setPlayerIcon(event.target.value);
  }

  function handleInputNameChange(event: ChangeEvent<HTMLInputElement>) {
    setPlayerName(event.target.value);
  }

  function dataSave() {
    const icon = (() => {
      switch (playerIcon) {
        case '':
          return PlayerIcon.Icon01;
        default:
          return playerIcon as PlayerIcon;
      }
    })();
    LocalStorageService.setEntryPlayerName(playerName);
    LocalStorageService.setEntryPlayerIcon(icon);
  }

  async function dataSaveAndMove() {
    const deviceId = DeviceIdService.get();
    const playerData: APIData.APISendEntryPlayerData = {
      deviceId: deviceId,
      playerName: playerName,
      playerIcon: playerIcon,
    };
    const isDuplicate = await APIService.postCheckDuplEntryPlayerName(
      playerData
    );
    if (isDuplicate == undefined) {
      console.error('Error: isDuplicate is undefined');
      return;
    }
    if (isDuplicate) {
      setErrorText('エラー：名前が重複しています');
      return;
    }
    dataSave();
    const tempRegistResult = await APIService.postPlayerTempRegist(playerData);
    if (tempRegistResult == undefined) {
      return;
    }
    if (!tempRegistResult) {
      setErrorText('エラー：ユーザー仮登録時にエラーが発生しました');
      return;
    }
    console.log(tempRegistResult);
    router.push('/pl/entry/confirm/');
    return;
  }

  return (
    <DarkForestLayout flexType={FlexBaseLayoutStyle.Top}>
      <LogoHeader />
      <form>
        <div className={styles.nameInput}>
          <div className={styles.nameInput__label}>
            <label htmlFor="name">名前を入力してください</label>
          </div>
          <div className={styles.nameInput__input}>
            <PlayerNameInput
              initValue={playerName}
              changeEvent={handleInputNameChange}
            />
          </div>
        </div>
        <div className={styles.iconSelect}>
          <p className={styles.iconSelect__label}>アイコンを選択してください</p>
          <ul>
            <PlayerIconElemList
              selectedIcon={playerIcon}
              selectEvent={handleOptionChange}
            />
          </ul>
        </div>
      </form>
      <p>{errorText}</p>
      <ul className={styles.bottomButtons}>
        <li className={styles.bottomButtons__button_first}>
          {playerName === '' || playerIcon === '' ? (
            <Button type={ButtonStyle.Disable}>次へ</Button>
          ) : (
            <span onClick={dataSaveAndMove}>
              <Button type={ButtonStyle.Blue}>次へ</Button>
            </span>
          )}
        </li>
      </ul>
    </DarkForestLayout>
  );
}
