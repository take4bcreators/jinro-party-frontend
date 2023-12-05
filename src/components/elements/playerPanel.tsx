import { useEffect, useState } from 'react';
import { PlayerIcon } from '@/config/playerIcon';
import { PlayerPanelDataSrc } from '@/config/playerPanelDataSrc';
import styles from '@/styles/components/elements/playerPanel.module.scss';
import { LocalStorageService } from '@/utils/localStorageService';
import PlayerIconElem from './playerIconElem';

type Props = {
  dataSrc?: PlayerPanelDataSrc;
  initPlayerName?: string;
  initPlayerIcon?: PlayerIcon;
};

export default function Home({
  dataSrc,
  initPlayerName,
  initPlayerIcon,
}: Props): JSX.Element {
  const [playerName, setPlayerName] = useState<string | undefined>(
    initPlayerName
  );
  const [playerIcon, setPlayerIcon] = useState<PlayerIcon | undefined>(
    initPlayerIcon
  );

  useEffect(() => {
    if (playerName != undefined) {
      return;
    }
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
  }, [dataSrc, playerName]);

  return (
    <div className={styles.panel}>
      <div className={styles.icon}>
        <PlayerIconElem icon={playerIcon} />
      </div>
      <div className={styles.name}>{playerName ?? ''}</div>
    </div>
  );
}
