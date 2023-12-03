import Citizen from '@/app/pl/playing/nightaction/citizen/Citizen';
import Hunter from '@/app/pl/playing/nightaction/hunter/Hunter';
import Madman from '@/app/pl/playing/nightaction/madman/Madman';
import Medium from '@/app/pl/playing/nightaction/medium/Medium';
import Seer from '@/app/pl/playing/nightaction/seer/Seer';
import Werewolf from '@/app/pl/playing/nightaction/werewolf/Werewolf';
import { PlayerRole } from '@/config/playerRole';
import { LocalStorageService } from '@/utils/localStorageService';
import { useState } from 'react';

import Button from '@/components/elements/button';
import { ButtonStyle } from '@/config/buttonStyle';

import PlayingLayout from '@/components/layouts/playingLayout';
import { PlayingLayoutStyle } from '@/config/playingLayoutStyle';
import Logo from '@/components/elements/logo';
import { LogoStyle } from '@/config/logoStyle';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import PlayerPanel from '@/components/elements/playerPanel';
import styles from '@/styles/app/pl/playing/playing.module.scss';
import PlayingFooter from '@/components/layouts/playingFooter';
import StateTitle from '@/components/elements/stateTitle';
import { StateTitleStyle } from '@/config/stateTitleStyle';

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
      <PlayingLayout
        flexType={FlexBaseLayoutStyle.FooterCenter}
        type={PlayingLayoutStyle.Dark}
      >
        <StateTitle type={StateTitleStyle.Dark} title={'Night Time'} />
        <span onClick={buttonHandler}>
          <Button type={ButtonStyle.Purple}>はじめる</Button>
        </span>
        <PlayingFooter />
      </PlayingLayout>
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
