import { ReactNode } from 'react';
import { StateTitleStyle } from '@/config/stateTitleStyle';
import styles from '@/styles/components/elements/stateTitle.module.scss';

type Props = {
  type: StateTitleStyle;
  title: string;
  children?: ReactNode;
};

export default function Home({ type, title, children }: Props): JSX.Element {
  const styleClass = styles[type.toLocaleLowerCase()];
  return (
    <div className={styles.flexWrapper}>
      <h1 className={styles.titleText}>{title}</h1>
      <div className={styleClass}></div>
      {children != undefined ? (
        <div className={styles.text}>{children}</div>
      ) : (
        <></>
      )}
    </div>
  );
}
