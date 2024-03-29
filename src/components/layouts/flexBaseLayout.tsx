import { ReactNode } from 'react';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import styles from '@/styles/components/layouts/flexBaseLayout.module.scss';

type Props = {
  flexType: FlexBaseLayoutStyle;
  children: ReactNode;
};

export default function Home({ flexType, children }: Props): JSX.Element {
  const flexStyleClass = `flex${flexType}`;
  return (
    <>
      <div className={styles.body}>
        <div className={styles[flexStyleClass]}>{children}</div>
      </div>
    </>
  );
}
