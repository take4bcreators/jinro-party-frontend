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
//     pagePushProgress.current = false;
//   }, []);

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
//     wsService.updateGameState(GameState.PlayerListDisplay);
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
//     setPushPage('/gm/setting/input/');
//   }

//   async function moveNextPage() {
//     const isSuccess = await APIService.execGETExecEntryRegist();
//     if (isSuccess == undefined) {
//       return;
//     }
//     if (!isSuccess) {
//       return;
//     }
//     setUseWs(true);
//     setPushPage('/gm/playing/');
//   }

//   return (
//     <>
//       <p>ゲーム設定画面...</p>
//       <ul>
//         <li>
//           <span onClick={moveNextPage}>ゲーム開始</span>
//         </li>
//         <li>
//           <span onClick={doCancel}>戻る</span>
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

  async function beforeMoveNextProcess() {
    await stateChange(GameState.PlayerListDisplay);
    // 将来的にはここに設定更新POST実行を入れる
    return;
  }

  return (
    <>
      <p>ゲーム設定画面...</p>
      <ul>
        <li>
          <Link href="/gm/playing/" onClick={beforeMoveNextProcess}>
            ゲーム開始
          </Link>
        </li>
        <li>
          <Link href="/gm/setting/input/">戻る</Link>
        </li>
      </ul>
    </>
  );
}
