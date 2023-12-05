import { ChangeEvent } from 'react';
import { PlayerIcon } from '@/config/playerIcon';
import styles from '@/styles/components/elements/playerIconElemList.module.scss';
import PlayerIconElem from './playerIconElem';

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
        <li
          key={index}
          className={
            selectedIcon !== ''
              ? selectedIcon !== value
                ? styles.innerDisable
                : styles.innerDefault
              : styles.innerDefault
          }
        >
          <label>
            <input
              type="radio"
              value={value}
              checked={selectedIcon === value}
              onChange={selectEvent}
              className={styles.input}
            />
            <PlayerIconElem icon={value} />
          </label>
        </li>
      ))}
    </div>
  );
}
