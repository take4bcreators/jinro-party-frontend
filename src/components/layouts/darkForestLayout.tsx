import { ReactNode } from 'react';
import FlexBaseLayout from '@/components/layouts/flexBaseLayout';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import styles from '@/styles/components/layouts/darkForestLayout.module.scss';

type Props = {
  flexType: FlexBaseLayoutStyle;
  children: ReactNode;
};

export default function Home({ flexType, children }: Props): JSX.Element {
  const BG_COLOR = '#061636';
  return (
    <FlexBaseLayout flexType={flexType}>
      {children}
      <style jsx global>{`
        body {
          background-color: ${BG_COLOR};
        }
      `}</style>
    </FlexBaseLayout>
  );
}
