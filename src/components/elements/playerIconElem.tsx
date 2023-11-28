import Image from 'next/image';
import styles from '@/styles/components/elements/playerIconElem.module.scss';
import { PlayerIcon } from '@/config/playerIcon';
import { PLAYER_ICON_FILE } from '@/config/playerIconFile';
import { PlayerIconElemStyle } from '@/config/playerIconElemStyle';

type Props = {
  icon: PlayerIcon;
  type: PlayerIconElemStyle;
};

export default function Home({ icon, type }: Props): JSX.Element {
  const imageFile = PLAYER_ICON_FILE.get(icon);
  const imageSrc = `/images/${imageFile}.svg`;
  const styleClass = styles[type.toLocaleLowerCase()];
  return (
    <>
      <Image
        src={imageSrc}
        alt=""
        className={styleClass}
        width={64}
        height={64}
      />
    </>
  );
}
