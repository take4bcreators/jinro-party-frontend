import { APIData } from '@/types/apiData';
import { APIService } from '@/utils/apiService';
import { DeviceIdService } from '@/utils/deviceIdService';
import { LocalStorageService } from '@/utils/localStorageService';
import { ChangeEvent, useEffect, useState } from 'react';
import PlayingLayout from '@/components/layouts/playingLayout';
import { PlayingLayoutStyle } from '@/config/playingLayoutStyle';

export default function Home(): JSX.Element {
  const [playerList, setPlayerList] = useState<APIData.APIReplyPlayerData[]>(
    []
  );
  const [selectPlayerId, setSelectPlayerId] = useState('');
  const [isVoted, setVoted] = useState(false);

  useEffect(() => {
    (async () => {
      const resData = await APIService.getFetchMainVoteReceivers();
      if (resData == undefined) {
        return;
      }
      const allPlayer = resData.allPlayerData;
      const deviceId = DeviceIdService.get();
      const receiverPlayers = allPlayer.filter(
        (player) => player.deviceId != deviceId
      );
      setPlayerList(receiverPlayers);
    })();
  }, []);

  function handleOptionChange(event: ChangeEvent<HTMLInputElement>) {
    setSelectPlayerId(event.target.value);
  }

  async function handleSubmitButton() {
    const deviceId = DeviceIdService.get();
    const playerName = LocalStorageService.getPlayingPlayerName();
    const playerIcon = LocalStorageService.getPlayingPlayerIcon();
    const receiverPlayer = playerList.find(
      (player) => player.deviceId === selectPlayerId
    );
    if (playerName == undefined) {
      return;
    }
    if (playerIcon == undefined) {
      return;
    }
    if (receiverPlayer == undefined) {
      return;
    }
    const voteData: APIData.APISendVotePlayerData = {
      voterDeviceId: deviceId,
      voterPlayerName: playerName,
      voterPlayerIcon: playerIcon,
      receiverDeviceId: receiverPlayer.deviceId,
      receiverPlayerName: receiverPlayer.playerName,
      receiverPlayerIcon: receiverPlayer.playerIcon,
    };
    const saveResult = await APIService.postSaveMainVote(voteData);
    if (saveResult == undefined) {
      return;
    }
    if (!saveResult) {
      return;
    }
    setVoted(true);
  }

  function handleBackButton() {
    setVoted(false);
  }

  if (playerList.length === 0) {
    return <></>;
  }

  if (isVoted) {
    return (
      <PlayingLayout type={PlayingLayoutStyle.Orange}>
        <h1>Voting Time</h1>
        <p>投票完了</p>
        <p>そのままお待ち下さい...</p>
        <p>
          <button type="button" onClick={handleBackButton}>
            投票し直す
          </button>
        </p>
      </PlayingLayout>
    );
  }

  return (
    <PlayingLayout type={PlayingLayoutStyle.Orange}>
      <h1>Voting Time</h1>
      <p>処刑する人を投票してください</p>
      <form>
        <ul>
          {playerList.map((player, index) => {
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
            onClick={handleSubmitButton}
          >
            投票する
          </button>
        </p>
      </form>
    </PlayingLayout>
  );
}
