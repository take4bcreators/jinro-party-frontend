import { useState } from 'react';
import Button from '@/components/elements/button';
import RoleName from '@/components/elements/roleName';
import StateTitle from '@/components/elements/stateTitle';
import DarkForestLayout from '@/components/layouts/darkForestLayout';
import LogoHeader from '@/components/layouts/logoHeader';
import PlayingFooter from '@/components/layouts/playingFooter';
import { ButtonStyle } from '@/config/buttonStyle';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { StateTitleStyle } from '@/config/stateTitleStyle';
import styles from '@/styles/app/pl/playing/playing.module.scss';
import { APIService } from '@/utils/apiService';
import { DeviceIdService } from '@/utils/deviceIdService';

export default function Home(): JSX.Element {
  const [startCheck, setStartCheck] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  function buttonHandler() {
    setStartCheck(true);
  }

  if (!startCheck) {
    return (
      <DarkForestLayout flexType={FlexBaseLayoutStyle.Top}>
        <LogoHeader />
        <StateTitle type={StateTitleStyle.Default} title={'役職確認'} />
        <div className={styles.roleAssignmentStart}>
          <div onClick={buttonHandler}>
            <Button type={ButtonStyle.Blue}>確認する</Button>
          </div>
        </div>
        <PlayingFooter />
      </DarkForestLayout>
    );
  }

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

  function handleReCheckButton() {
    setSendSuccess(false);
  }

  if (sendSuccess) {
    return (
      <DarkForestLayout flexType={FlexBaseLayoutStyle.Top}>
        <LogoHeader />
        <div className={styles.flexInformation}>
          <p>
            他のプレイヤーを
            <wbr />
            待っています...
          </p>
        </div>
        <ul>
          <li>
            <span onClick={handleReCheckButton}>
              <Button type={ButtonStyle.Blue}>再確認</Button>
            </span>
          </li>
        </ul>
        <PlayingFooter />
      </DarkForestLayout>
    );
  }

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
          <span onClick={sendRoleChecked}>
            <Button type={ButtonStyle.Blue}>OK</Button>
          </span>
        </li>
      </ul>
      <PlayingFooter />
    </DarkForestLayout>
  );
}
