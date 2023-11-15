import { APIData } from '@/types/apiData';
import { APIService } from '@/utils/apiService';
import { useEffect, useState } from 'react';

export default function Home(): JSX.Element {
  const [dropoutPlayer, setDropoutPlayer] = useState<
    APIData.APIPlayerBasicData | undefined
  >(undefined);

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

  if (dropoutPlayer.deviceId === '') {
    return (
      <>
        <section>
          <h1>朝になると...</h1>
          <p>昨夜の犠牲者は...</p>
          <p>
            <strong>いませんでした</strong>
          </p>
        </section>
      </>
    );
  }

  return (
    <>
      <section>
        <h1>朝になると...</h1>
        <p>昨夜の犠牲者は...</p>
        <p>{dropoutPlayer.playerName}</p>
        <p>{dropoutPlayer.playerIcon}</p>
      </section>
    </>
  );
}
