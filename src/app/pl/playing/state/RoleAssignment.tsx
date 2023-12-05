import { useState } from 'react';
import RoleName from '@/components/elements/RoleName';
import Button from '@/components/elements/button';
import DarkForestLayout from '@/components/layouts/darkForestLayout';
import LogoHeader from '@/components/layouts/logoHeader';
import PlayingFooter from '@/components/layouts/playingFooter';
import { ButtonStyle } from '@/config/buttonStyle';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import styles from '@/styles/app/pl/playing/playing.module.scss';
import { APIService } from '@/utils/apiService';
import { DeviceIdService } from '@/utils/deviceIdService';

export default function Home(): JSX.Element {
  const [sendSuccess, setSendSuccess] = useState(false);

  async function sendRoleChecked() {
    const sendDeviceId = DeviceIdService.getToAPIData();
    const result = await APIService.postSelfRoleChecked(sendDeviceId);
    if (result == undefined) {
      return;
    }
    if (!result) {
      return;
    }
    setSendSuccess(true);
  }

  const OkButton = () => {
    if (sendSuccess) {
      return <>ほかのプレイヤーを待っています...</>;
    }
    return (
      <span onClick={sendRoleChecked}>
        <Button type={ButtonStyle.Blue}>OK</Button>
      </span>
    );
  };

  return (
    <DarkForestLayout flexType={FlexBaseLayoutStyle.Top}>
      <LogoHeader />
      <div className={styles.topInformation}>
        <p>あなたは...</p>
        <p className={styles.largeInformation}>
          <RoleName />
        </p>
      </div>
      <ul>
        <li>
          <OkButton />
        </li>
      </ul>
      <PlayingFooter />
    </DarkForestLayout>
  );
}
