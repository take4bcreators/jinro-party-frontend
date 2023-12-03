import { ReactNode } from 'react';
import FlexBaseLayout from '@/components/layouts/flexBaseLayout';
import styles from '@/styles/components/layouts/playingLayout.module.scss';
import { PlayingLayoutStyle } from '@/config/playingLayoutStyle';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';

type Props = {
  flexType: FlexBaseLayoutStyle;
  type: PlayingLayoutStyle;
  children: ReactNode;
};

export default function Home({ flexType, type, children }: Props): JSX.Element {
  let bgColor = '';
  switch (type) {
    case PlayingLayoutStyle.SkyBlue:
      bgColor = '#2FB4FF';
      break;
    case PlayingLayoutStyle.Orange:
      bgColor = '#F0B46D';
      break;
    case PlayingLayoutStyle.Purple:
      bgColor = '#C590D8';
      break;
    case PlayingLayoutStyle.Dark:
      bgColor = '#061636';
      break;
    case PlayingLayoutStyle.Red:
      bgColor = '#F0A7C2';
      break;
    default:
      break;
  }

  return (
    <FlexBaseLayout flexType={flexType}>
      {children}
      <style jsx global>{`
        body {
          background-color: ${bgColor};
        }
      `}</style>
    </FlexBaseLayout>
  );
}
