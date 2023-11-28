import Image from 'next/image';
import styles from '@/styles/components/elements/logo.module.scss';
import { LogoStyle } from '@/config/logoStyle';

type Props = {
  type: LogoStyle;
};

export default function Home({ type }: Props): JSX.Element {
  const styleClass = styles[type.toLocaleLowerCase()];
  return (
    <>
      <Image
        src="/images/wolffice_logo.png"
        alt="Wolffice"
        className={styleClass}
        width={1405}
        height={362}
      />
    </>
  );
}
