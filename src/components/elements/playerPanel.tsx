import { PlayerPanelDataSrc } from '@/config/playerPanelDataSrc';
import styles from '@/styles/components/elements/playerPanel.module.scss';
import { LocalStorageService } from '@/utils/localStorageService';
import { useEffect, useState } from 'react';
import PlayerIconElem from './playerIconElem';
import { PlayerIcon } from '@/config/playerIcon';

type Props = {
  dataSrc?: PlayerPanelDataSrc;
};

export default function Home({ dataSrc }: Props): JSX.Element {
  const [playerName, setPlayerName] = useState<string | undefined>();
  const [playerIcon, setPlayerIcon] = useState<PlayerIcon | undefined>();

  useEffect(() => {
    const [name, icon] = ((dataSrc?: PlayerPanelDataSrc) => {
      switch (dataSrc) {
        case PlayerPanelDataSrc.Entry:
          const entryName = LocalStorageService.getEntryPlayerName();
          const entryIcon = LocalStorageService.getEntryPlayerIcon();
          return [entryName, entryIcon];
        case PlayerPanelDataSrc.Playing:
        default:
          const playingName = LocalStorageService.getEntryPlayerName();
          const playingIcon = LocalStorageService.getEntryPlayerIcon();
          return [playingName, playingIcon];
      }
    })(dataSrc);
    setPlayerName(name);
    setPlayerIcon(icon);
  }, [dataSrc]);

  return (
    <div className={styles.panel}>
      <div className={styles.icon}>
        <PlayerIconElem icon={playerIcon} />
      </div>
      <div className={styles.name}>{playerName ?? ''}</div>
    </div>
  );
}
