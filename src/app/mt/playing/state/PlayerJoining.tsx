'use client';
import { useEffect, useState } from 'react';
import Logo from '@/components/elements/logo';
import QRCode from '@/components/elements/qrcode';
import DarkForestLayout from '@/components/layouts/darkForestLayout';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { LogoStyle } from '@/config/logoStyle';
import styles from '@/styles/app/mt/playing/playing.module.scss';

export default function Home(): JSX.Element {
  const [playerSite, setPlayerSite] = useState<string | undefined>(undefined);
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

  if (playerSite == undefined) {
    return <></>;
  }
  // return (
  //   <>
  //     <h1>WOLFFICE</h1>
  //     <p>QRコードを読み取ってください</p>
  //     <main className="text-lg">
  //       <QRCode url={playerSite} />
  //     </main>
  //   </>
  // );
  return (
    <DarkForestLayout flexType={FlexBaseLayoutStyle.Default}>
      <Logo type={LogoStyle.Default} />
      <div className={styles.qrPageCenterSet}>
        <div className={styles.qrPageQrcodeArea}>
          <QRCode url={playerSite} />
        </div>
        <div className={styles.qrPageEntryPlayerInformations}>
          <p>現在のエントリー数</p>
          <p className={styles.qrPageEntryPlayerInformationText}>0</p>
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
