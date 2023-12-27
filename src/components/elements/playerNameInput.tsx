import { ChangeEvent } from 'react';
import styles from '@/styles/components/elements/playerNameInput.module.scss';

type Props = {
  initValue: string;
  changeEvent: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function Home({ initValue, changeEvent }: Props): JSX.Element {
  return (
    <>
      <input
        type="text"
        id="name"
        name="name"
        onChange={changeEvent}
        value={initValue}
        autoComplete="off"
        className={styles.input}
        placeholder={'タップして入力'}
      />
    </>
  );
}
