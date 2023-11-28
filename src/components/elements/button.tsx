import { ReactNode } from 'react';
import styles from '@/styles/components/elements/button.module.scss';
import { ButtonStyle } from '@/config/buttonStyle';

type Props = {
  type: ButtonStyle;
  children: ReactNode;
};

export default function Home({ type, children }: Props): JSX.Element {
  const styleClass = styles[type.toLocaleLowerCase()];
  return (
    <>
      <button className={styleClass}>{children}</button>
    </>
  );
}
