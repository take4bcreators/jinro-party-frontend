'use client';
import { APIData } from '@/types/apiData';
import { APIService } from '@/utils/apiService';
import { DeviceIdService } from '@/utils/deviceIdService';
import { LocalStorageService } from '@/utils/localStorageService';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

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
    <>
      <h1>プレイヤー情報入力</h1>
      <form action="#" method="post">
        <div>
          <label htmlFor="name">名前入力</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleInputNameChange}
            value={playerName}
            autoComplete="off"
          />
        </div>
        <div>
          <p>アイコン選択</p>
          <label>
            <input
              type="radio"
              value="icon01"
              checked={playerIcon === 'icon01'}
              onChange={handleOptionChange}
            />
            icon01
          </label>
          <label>
            <input
              type="radio"
              value="icon02"
              checked={playerIcon === 'icon02'}
              onChange={handleOptionChange}
            />
            icon02
          </label>
          <label>
            <input
              type="radio"
              value="icon03"
              checked={playerIcon === 'icon03'}
              onChange={handleOptionChange}
            />
            icon03
          </label>
          <label>
            <input
              type="radio"
              value="icon04"
              checked={playerIcon === 'icon04'}
              onChange={handleOptionChange}
            />
            icon04
          </label>
          <label>
            <input
              type="radio"
              value="icon05"
              checked={playerIcon === 'icon05'}
              onChange={handleOptionChange}
            />
            icon05
          </label>
          <label>
            <input
              type="radio"
              value="icon06"
              checked={playerIcon === 'icon06'}
              onChange={handleOptionChange}
            />
            icon06
          </label>
          <label>
            <input
              type="radio"
              value="icon07"
              checked={playerIcon === 'icon07'}
              onChange={handleOptionChange}
            />
            icon07
          </label>
          <label>
            <input
              type="radio"
              value="icon08"
              checked={playerIcon === 'icon08'}
              onChange={handleOptionChange}
            />
            icon08
          </label>
          <label>
            <input
              type="radio"
              value="icon09"
              checked={playerIcon === 'icon09'}
              onChange={handleOptionChange}
            />
            icon09
          </label>
        </div>
      </form>
      <p>{errorText}</p>
      <ul>
        <li>
          <span onClick={dataSaveAndMove}>次へ</span>
        </li>
        <li>
          <Link href="/pl/" onClick={dataSave}>
            戻る
          </Link>
        </li>
      </ul>
    </>
  );
}
