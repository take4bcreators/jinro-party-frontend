import styles from '@/styles/components/elements/playerIconElemList.module.scss';
import { PlayerIcon } from '@/config/playerIcon';
import { PlayerIconElemStyle } from '@/config/playerIconElemStyle';
import PlayerIconElem from './playerIconElem';
import { ChangeEvent } from 'react';

type Props = {
  selectedIcon: string;
  selectEvent: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function Home({
  selectedIcon,
  selectEvent,
}: Props): JSX.Element {
  return (
    <div className={styles.outer}>
      {Object.entries(PlayerIcon).map(([key, value], index) => (
        <label key={index} className={styles.inner}>
          <input
            type="radio"
            value={value}
            checked={selectedIcon === value}
            onChange={selectEvent}
            className={styles.input}
          />
          <PlayerIconElem
            icon={value}
            type={
              selectedIcon !== ''
                ? selectedIcon !== value
                  ? PlayerIconElemStyle.Disable
                  : PlayerIconElemStyle.Default
                : PlayerIconElemStyle.Default
            }
          />
        </label>
      ))}
    </div>
  );
}
