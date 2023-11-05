import { PlayerRoleSetting } from '@/config/playerRoleSetting';
import { APIService } from '@/utils/apiService';
import { DeviceIdService } from '@/utils/deviceIdService';
import { LocalStorageService } from '@/utils/localStorageService';
import { useEffect, useState } from 'react';

export default function Home(): JSX.Element {
  const [roleName, setRoleName] = useState('');

  useEffect(() => {
    (async () => {
      const sendDeviceId = DeviceIdService.getToAPIData();
      const result = await APIService.postFetchPlayerData(sendDeviceId);
      if (result == undefined) {
        setRoleName(' ！ エラー ！ ');
        console.error('ERROR: result == undefined');
        return;
      }
      const playerRole = result.playerRole;
      const playerTeam = result.playerTeam;
      const roleName = PlayerRoleSetting.RoleName.get(playerRole);
      if (roleName == undefined) {
        setRoleName(' ！ エラー ！ ');
        console.error('ERROR: roleName == undefined');
        return;
      }
      setRoleName(roleName);

      // ローカルストレージへの保存
      LocalStorageService.setPlayingPlayerRole(playerRole);
      LocalStorageService.setPlayingPlayerTeam(playerTeam);
    })();
  }, []);

  return <>{roleName}</>;
}
