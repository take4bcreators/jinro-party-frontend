'use client';

import { GameState } from '@/config/gameState';
// import { WsSenderType } from '@/config/wsSenderType';
import { APIData } from '@/types/apiData';
// import { APIWsData } from '@/types/apiWsData';
import { APIService } from '@/utils/apiService';
// import { WsService } from '@/utils/wsService';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useEffect, useRef, useState } from 'react';

// export default function Home(): JSX.Element {
//   const router = useRouter();
//   const pagePushProgress = useRef(false);
//   const [pushPage, setPushPage] = useState('');
//   const [useWs, setUseWs] = useState(false);
//   const [_wsRcvData, setWsRcvData] = useState<APIWsData | undefined>(undefined);
//   const [wsIsOpen, setWsIsOpen] = useState(false);
//   const [wsService, setWsService] = useState<WsService | undefined>(undefined);

//   useEffect(() => {
//     if (!useWs) {
//       return;
//     }
//     setWsService(
//       new WsService(WsSenderType.GameMasterSite, setWsIsOpen, setWsRcvData)
//     );
//   }, [useWs]);

//   useEffect(() => {
//     if (wsService == undefined) {
//       return;
//     }
//     if (!wsIsOpen) {
//       return;
//     }
//     wsService.updateGameState(GameState.PlayerJoining);
//   }, [wsService, wsIsOpen]);

//   useEffect(() => {
//     if (pagePushProgress.current) {
//       return;
//     }
//     if (pushPage === '') {
//       return;
//     }
//     router.push(pushPage);
//     pagePushProgress.current = true;
//   }, [pushPage, router]);

//   function doCancel() {
//     setUseWs(true);
//     setPushPage('/gm/joining/');
//   }

//   function moveNextPage() {
//     setPushPage('/gm/setting/confirm/');
//   }

//   return (
//     <>
//       <p>ゲーム設定画面...</p>
//       <ul>
//         <li>
//           <span onClick={moveNextPage}>次へ</span>
//         </li>
//         <li>
//           <span onClick={doCancel}>募集へ戻る</span>
//         </li>
//       </ul>
//     </>
//   );
// }

export default function Home(): JSX.Element {
  async function stateChange(gameState: GameState) {
    const sendData: APIData.APISendGameState = {
      gameState: gameState,
    };
    const changeResult = await APIService.execPOSTChangeGameState(sendData);
    if (changeResult == undefined) {
      console.error('APIService.execPOSTChangeGameState result is undefined');
      return;
    }
    if (!changeResult) {
      console.error('APIService.execPOSTChangeGameState result is false');
      return;
    }
    return;
  }

  async function cancelProcess() {
    await stateChange(GameState.PlayerJoining);
  }

  return (
    <>
      <p>ゲーム設定画面...</p>
      <ul>
        <li>
          <Link href="/gm/setting/confirm/">次へ</Link>
        </li>
        <li>
          <Link href="/gm/joining/" onClick={cancelProcess}>
            募集へ戻る
          </Link>
        </li>
      </ul>
    </>
  );
}
