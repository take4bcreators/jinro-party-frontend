'use client';
import { useEffect, useState } from 'react';
import Logo from '@/components/elements/logo';
import QRCode from '@/components/elements/qrcode';
import DarkForestLayout from '@/components/layouts/darkForestLayout';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { LogoStyle } from '@/config/logoStyle';
import styles from '@/styles/app/mt/playing/playing.module.scss';
import { APIService } from '@/utils/apiService';

type Props = {
  entryPlayerCount: string;
};

export default function Home({ entryPlayerCount }: Props): JSX.Element {
  const [playerSite, setPlayerSite] = useState<string | undefined>(undefined);
  const [entryCount, setEntryCount] = useState(entryPlayerCount);

  useEffect(() => {
    let host = process.env.NEXT_PUBLIC_SELF_HOSTNAME;
    if (host == undefined || host === '') {
      host = window.location.hostname;
    }
    let port = process.env.NEXT_PUBLIC_SELF_PORT;
    if (port == undefined || port === '') {
      port = '3000';
    }
    setPlayerSite(`http://${host}:${port}/pl/`);
  }, []);

  useEffect(() => {
    if (entryCount !== '') {
      return;
    }
    (async () => {
      const entryPlayers = await APIService.getFetchEntryPlayers();
      if (entryPlayers == undefined) {
        setEntryCount('0');
        return;
      }
      const length = entryPlayers.allData.length;
      setEntryCount(length.toString());
    })();
  }, [entryCount]);

  return (
    <DarkForestLayout flexType={FlexBaseLayoutStyle.Default}>
      <Logo type={LogoStyle.Default} />
      <div className={styles.qrPageCenterSet}>
        <div className={styles.qrPageQrcodeArea}>
          {playerSite == undefined ? <></> : <QRCode url={playerSite} />}
        </div>
        <div className={styles.qrPageEntryPlayerInformations}>
          <p>現在のエントリー数</p>
          <p className={styles.qrPageEntryPlayerInformationText}>
            {entryPlayerCount !== '' ? entryPlayerCount : entryCount}
          </p>
        </div>
      </div>
      <p className={styles.textUnderInformation}>
        QRコードを読み取って
        <wbr />
        エントリーしてください
      </p>
    </DarkForestLayout>
  );
}
