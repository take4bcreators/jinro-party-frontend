// import { ChangeEvent, useEffect, useLayoutEffect, useState } from 'react';
// import Logo from '@/components/elements/logo';
// import PlayerListForGM from '@/components/elements/playerListForGM';
// import DarkForestLayout from '@/components/layouts/darkForestLayout';
// import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
// import { LogoStyle } from '@/config/logoStyle';
// import { PlayerRole } from '@/config/playerRole';
// import { PlayerState } from '@/config/playerState';
// import { PlayerTeam } from '@/config/playerTeam';
// import styles from '@/styles/app/gm/playing/playing.module.scss';
// import { APIData } from '@/types/apiData';
// import { APIService } from '@/utils/apiService';
// import { LocalStorageService } from '@/utils/localStorageService';

// const DEBUG: boolean = true;

// export default function Home(): JSX.Element {
//   const [allPlayer, setAllPlayer] = useState<
//     APIData.APIReplyPlayerData[] | undefined
//   >(undefined);

//   const [viewMode, setViewMode] = useState('');

//   useEffect(() => {
//     setViewMode(LocalStorageService.getGmViewmode() ?? 'OFF');
//   }, []);

//   function handleOptionChange(event: ChangeEvent<HTMLInputElement>) {
//     const mode = event.target.value;
//     setViewMode(mode);
//     LocalStorageService.setGmViewmode(mode);
//   }

//   useEffect(() => {
//     (async () => {
//       if (DEBUG) {
//         const PLAYER_COUNT: number = 8;
//         const debugPlayerList: APIData.APIReplyPlayerData[] = [];
//         for (let index = 1; index <= PLAYER_COUNT; index++) {
//           const iconNumber = ((index - 1) % 10) + 1;
//           debugPlayerList.push({
//             deviceId: `dummy${index.toString().padStart(3, '0')}`,
//             playerName: `プレイヤー${index}`,
//             playerIcon: `Icon${iconNumber.toString().padStart(2, '0')}`,
//             playerRole: PlayerRole.Citizen,
//             playerTeam: PlayerTeam.Townsfolk,
//             playerState: PlayerState.Alive,
//           });
//         }
//         setAllPlayer(debugPlayerList);
//         return;
//       }
//       const allPlayerInfo = await APIService.getFetchAllPlayerInfo();
//       if (allPlayerInfo == undefined) {
//         return;
//       }
//       setAllPlayer(allPlayerInfo);
//     })();
//   }, []);

//   return (
//     <DarkForestLayout flexType={FlexBaseLayoutStyle.Top}>
//       <div className={styles.stickyTopDefault}>
//         <Logo type={LogoStyle.Small} />
//       </div>
//       <div className={styles.modeSelect}>
//         <h1 className={styles.modeSelectTitle}>View Mode</h1>
//         <ul className={styles.modeSelectInputs}>
//           <li>
//             <label>
//               <input
//                 type="radio"
//                 value={'ON'}
//                 checked={viewMode === 'ON'}
//                 onChange={handleOptionChange}
//                 className={styles.modeSelectInput}
//               />
//               ON
//             </label>
//           </li>
//           <li>
//             <label>
//               <input
//                 type="radio"
//                 value={'OFF'}
//                 checked={viewMode === 'OFF'}
//                 onChange={handleOptionChange}
//                 className={styles.modeSelectInput}
//               />
//               OFF
//             </label>
//           </li>
//         </ul>
//       </div>
//       {allPlayer == undefined || viewMode === 'OFF' ? (
//         <></>
//       ) : (
//         <ul className={styles.playerDisplayList}>
//           <PlayerListForGM playerList={allPlayer} />
//         </ul>
//       )}
//       <div className={styles.bottomDummy}></div>
//     </DarkForestLayout>
//   );
// }
