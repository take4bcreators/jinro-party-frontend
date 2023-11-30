import styles from '@/styles/components/elements/playerIconElem.module.scss';
import { PlayerIcon } from '@/config/playerIcon';
import IconDummy from '@/components/svg/iconDummy';
import Icon01 from '@/components/svg/icon01';
import Icon02 from '@/components/svg/icon02';
import Icon03 from '@/components/svg/icon03';
import Icon04 from '@/components/svg/icon04';
import Icon05 from '@/components/svg/icon05';
import Icon06 from '@/components/svg/icon06';
import Icon07 from '@/components/svg/icon07';
import Icon08 from '@/components/svg/icon08';
import Icon09 from '@/components/svg/icon09';
import Icon10 from '@/components/svg/icon10';

type Props = {
  icon?: PlayerIcon;
};

export default function Home({ icon }: Props): JSX.Element {
  const Icon = ((icon?: PlayerIcon) => {
    switch (icon) {
      case 'Icon01':
        return Icon01;
      case 'Icon02':
        return Icon02;
      case 'Icon03':
        return Icon03;
      case 'Icon04':
        return Icon04;
      case 'Icon05':
        return Icon05;
      case 'Icon06':
        return Icon06;
      case 'Icon07':
        return Icon07;
      case 'Icon08':
        return Icon08;
      case 'Icon09':
        return Icon09;
      case 'Icon10':
        return Icon10;
      default:
        return IconDummy;
    }
  })(icon);

  return <Icon />;
}
