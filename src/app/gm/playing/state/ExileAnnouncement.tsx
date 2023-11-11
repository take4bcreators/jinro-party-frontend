import { APIData } from '@/types/apiData';
import { APIService } from '@/utils/apiService';
import { useEffect, useState } from 'react';

import Timer from '@/components/elements/Timer';
import { useRef } from 'react';

type Props = {
  timerState: string;
  initialCount: string;
};

export default function Home({ timerState, initialCount }: Props): JSX.Element {
  const [exilePlayer, setExilePlayer] = useState<
    APIData.APIPlayerBasicData | undefined
  >(undefined);

  // タイマー関連
  const count = useRef(0);
  let timerCount = 0;
  if (initialCount === '') {
    timerCount = count.current;
  } else {
    timerCount = parseInt(initialCount) * 0.001;
    count.current = timerCount;
  }

  useEffect(() => {
    (async () => {
      const resData = await APIService.getFetchDropoutPlayer();
      if (resData == undefined) {
        return;
      }
      setExilePlayer(resData);
    })();
  }, []);

  if (exilePlayer == undefined) {
    return <></>;
  }

  return (
    <>
      <section>
        <h1>投票結果</h1>
        <p>{exilePlayer.playerName}</p>
        <p>{exilePlayer.playerIcon}</p>
        <p>追放</p>
        <p>残り時間..</p>
        <p>
          <Timer timerState={timerState} initialCount={timerCount} />
        </p>
      </section>
    </>
  );
}
