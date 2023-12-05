import { ReactNode } from 'react';
import { ButtonStyle } from '@/config/buttonStyle';
import styles from '@/styles/components/elements/button.module.scss';

type Props = {
  type: ButtonStyle;
  children: ReactNode;
};

export default function Home({ type, children }: Props): JSX.Element {
  const styleClass = styles[type.toLocaleLowerCase()];
  return (
    <>
      <div className={styleClass}>{children}</div>
    </>
  );
}
