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
  const [dropoutPlayer, setDropoutPlayer] = useState<
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
      setDropoutPlayer(resData);
    })();
  }, []);

  if (dropoutPlayer == undefined) {
    return <></>;
  }

  return (
    <>
      <section>
        <h1>投票結果</h1>
        <p>{dropoutPlayer.playerName}</p>
        <p>{dropoutPlayer.playerIcon}</p>
        <p>追放</p>
        <p>10秒で遺言をどうぞ</p>
        <p>残り時間..</p>
        <p>
          <Timer timerState={timerState} initialCount={timerCount} />
        </p>
      </section>
    </>
  );
}
