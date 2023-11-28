'use client';
import { APIData } from '@/types/apiData';
import { APIService } from '@/utils/apiService';
import { DeviceIdService } from '@/utils/deviceIdService';
import { LocalStorageService } from '@/utils/localStorageService';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Button from '@/components/elements/button';
import { ButtonStyle } from '@/config/buttonStyle';
import DarkForestLayout from '@/components/layouts/darkForestLayout';
import Logo from '@/components/elements/logo';
import { LogoStyle } from '@/config/logoStyle';
import { PlayerIcon } from '@/config/playerIcon';
import PlayerIconElem from '@/components/elements/playerIconElem';
import { PlayerIconElemStyle } from '@/config/playerIconElemStyle';
import PlayerIconElemList from '@/components/elements/playerIconElemList';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import styles from '@/styles/app/pl/entry/entry.module.scss';

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
    LocalStorageService.setEntryPlayerName(playerName);
    LocalStorageService.setEntryPlayerIcon(playerIcon);
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
      <h1 className={styles.topLogo}>
        <Logo type={LogoStyle.Small} />
      </h1>
      <form>
        <div className={styles.nameInput}>
          <div className={styles.nameInput__label}>
            <label htmlFor="name">名前を入力してください</label>
          </div>
          <div className={styles.nameInput__input}>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleInputNameChange}
              value={playerName}
              autoComplete="off"
            />
          </div>
        </div>
        <div className={styles.iconSelect}>
          <p className={styles.iconSelect__label}>アイコンを選択してください</p>
          <PlayerIconElemList
            selectedIcon={playerIcon}
            selectEvent={handleOptionChange}
          />
        </div>
      </form>
      <p>{errorText}</p>
      <ul className={styles.bottomButtons}>
        <li className={styles.bottomButtons__button}>
          <span onClick={dataSaveAndMove}>
            <Button type={ButtonStyle.Blue}>次へ</Button>
          </span>
        </li>
      </ul>
    </DarkForestLayout>
  );
}
