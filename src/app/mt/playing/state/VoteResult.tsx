import { APIData } from '@/types/apiData';
import { APIService } from '@/utils/apiService';
import { useState, useEffect } from 'react';

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

  return (
    <>
      <h1>投票結果</h1>
      <ul>
        {voteResult.allVotePlayerData.map((player, index) => {
          return (
            <li key={index}>
              {player.voterPlayerName} → {player.receiverPlayerName}
            </li>
          );
        })}
      </ul>
    </>
  );
}
