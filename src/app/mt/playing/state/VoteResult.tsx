import { useState, useEffect } from 'react';
import StateTitle from '@/components/elements/stateTitle';
import PlayingLayout from '@/components/layouts/playingLayout';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { PlayingLayoutStyle } from '@/config/playingLayoutStyle';
import { StateTitleStyle } from '@/config/stateTitleStyle';
import styles from '@/styles/app/mt/playing/playing.module.scss';
import { APIData } from '@/types/apiData';
import { APIService } from '@/utils/apiService';

export default function Home(): JSX.Element {
  const [voteResult, setVoteResult] = useState<
    APIData.APIReplyAllVotePlayerData | undefined
  >(undefined);

  useEffect(() => {
    (async () => {
      const resData = await APIService.getFetchVoteResult();
      if (resData == undefined) {
        return;
      }
      setVoteResult(resData);
    })();
  }, []);

  if (voteResult == undefined) {
    return <></>;
  }

  // return (
  //   <>
  //     <h1>投票結果</h1>
  //     <ul>
  //       {voteResult.allVotePlayerData.map((player, index) => {
  //         return (
  //           <li key={index}>
  //             {player.voterPlayerName} → {player.receiverPlayerName}
  //           </li>
  //         );
  //       })}
  //     </ul>
  //   </>
  // );
  return (
    <PlayingLayout
      flexType={FlexBaseLayoutStyle.Default}
      type={PlayingLayoutStyle.Purple}
      bgDecoration={true}
    >
      <StateTitle type={StateTitleStyle.Purple} title={'Voting Result'} />
      <ul>
        {voteResult.allVotePlayerData.map((player, index) => {
          return (
            <li key={index}>
              {player.voterPlayerName} → {player.receiverPlayerName}
            </li>
          );
        })}
      </ul>
    </PlayingLayout>
  );
}
