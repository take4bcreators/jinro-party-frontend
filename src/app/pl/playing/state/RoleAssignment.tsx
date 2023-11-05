import { APIService } from '@/utils/apiService';
import { DeviceIdService } from '@/utils/deviceIdService';
import { useState } from 'react';
import RoleName from '@/components/elements/RoleName';

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
      return <li>ほかのプレイヤーを待っています...</li>;
    }
    return <li onClick={sendRoleChecked}>OK !!</li>;
  };

  return (
    <>
      <section>
        <h1>役職発表</h1>
        <p>あなたは...</p>
        <p>
          <RoleName />
        </p>
        <p>です。</p>
      </section>
      <section>
        <ul>
          <OkButton />
        </ul>
      </section>
    </>
  );
}
