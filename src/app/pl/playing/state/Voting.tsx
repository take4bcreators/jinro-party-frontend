import { ChangeEvent, useEffect, useState } from 'react';
import Button from '@/components/elements/button';
import StateTitle from '@/components/elements/stateTitle';
import VotingList from '@/components/elements/votingList';
import PlayingFooter from '@/components/layouts/playingFooter';
import PlayingLayout from '@/components/layouts/playingLayout';
import { ButtonStyle } from '@/config/buttonStyle';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { PlayingLayoutStyle } from '@/config/playingLayoutStyle';
import { StateTitleStyle } from '@/config/stateTitleStyle';
import styles from '@/styles/app/pl/playing/playing.module.scss';
import { APIData } from '@/types/apiData';
import { APIService } from '@/utils/apiService';
import { DeviceIdService } from '@/utils/deviceIdService';
import { LocalStorageService } from '@/utils/localStorageService';

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
      <PlayingLayout
        flexType={FlexBaseLayoutStyle.FooterCenter}
        type={PlayingLayoutStyle.Orange}
      >
        <div className={styles.headerTitle}>
          <StateTitle type={StateTitleStyle.Orange} title={'Voting Time'}>
            <p>投票完了</p>
            <p>そのままお待ち下さい...</p>
          </StateTitle>
        </div>
        <p>
          <span onClick={handleBackButton}>
            <Button type={ButtonStyle.Plane}>投票し直す</Button>
          </span>
        </p>
        <PlayingFooter />
      </PlayingLayout>
    );
  }

  return (
    <PlayingLayout
      flexType={FlexBaseLayoutStyle.Top}
      type={PlayingLayoutStyle.Orange}
    >
      <div className={styles.headerTitle}>
        <StateTitle type={StateTitleStyle.Orange} title={'Voting Time'}>
          <p>
            処刑する人を
            <wbr />
            投票してください
          </p>
        </StateTitle>
      </div>
      <form>
        <ul>
          <VotingList
            playerList={playerList}
            selectPlayerId={selectPlayerId}
            selectEvent={handleOptionChange}
          />
        </ul>
        <ul className={styles.bottomButtons}>
          <li className={styles.bottomButtons__button_first}>
            {selectPlayerId === '' ? (
              <Button type={ButtonStyle.Disable}>投票する</Button>
            ) : (
              <span onClick={handleSubmitButton}>
                <Button type={ButtonStyle.Orange}>投票する</Button>
              </span>
            )}
          </li>
        </ul>
      </form>
      <PlayingFooter />
    </PlayingLayout>
  );
}
