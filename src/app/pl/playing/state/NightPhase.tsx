import Citizen from '@/app/pl/playing/nightaction/citizen/Citizen';
import Hunter from '@/app/pl/playing/nightaction/hunter/Hunter';
import Madman from '@/app/pl/playing/nightaction/madman/Madman';
import Medium from '@/app/pl/playing/nightaction/medium/Medium';
import Seer from '@/app/pl/playing/nightaction/seer/Seer';
import Werewolf from '@/app/pl/playing/nightaction/werewolf/Werewolf';
import { PlayerRole } from '@/config/playerRole';
import { LocalStorageService } from '@/utils/localStorageService';
import { useState } from 'react';

export default function Home(): JSX.Element {
  const [playerRole, setPlayerRole] = useState<PlayerRole | undefined>(
    undefined
  );

  function buttonHandler() {
    const selfRole = LocalStorageService.getPlayingPlayerRole();
    setPlayerRole(selfRole);
  }

  if (playerRole == undefined) {
    return (
      <>
        <h1>夜のフェーズ</h1>
        <p>
          <button type="button" onClick={buttonHandler}>
            はじめる
          </button>
        </p>
      </>
    );
  }

  let ViewPage: () => JSX.Element;
  switch (playerRole) {
    case PlayerRole.Citizen:
      ViewPage = Citizen;
      break;
    case PlayerRole.Hunter:
      ViewPage = Hunter;
      break;
    case PlayerRole.Madman:
      ViewPage = Madman;
      break;
    case PlayerRole.Medium:
      ViewPage = Medium;
      break;
    case PlayerRole.Seer:
      ViewPage = Seer;
      break;
    case PlayerRole.Werewolf:
      ViewPage = Werewolf;
      break;
    default:
      ViewPage = Citizen;
      break;
  }

  return (
    <>
      <ViewPage />
    </>
  );
}
