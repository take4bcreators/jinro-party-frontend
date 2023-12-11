import { ReactNode } from 'react';
import FlexBaseLayout from '@/components/layouts/flexBaseLayout';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import styles from '@/styles/components/layouts/darkForestLayout.module.scss';
import flexBaseLayoutStyles from '@/styles/components/layouts/flexBaseLayout.module.scss';
import Forest from '../elements/forest';

type Props = {
  flexType: FlexBaseLayoutStyle;
  children: ReactNode;
};

export default function Home({ flexType, children }: Props): JSX.Element {
  const BG_COLOR = '#061636';
  const flexStyleClass = `flex${flexType}`;
  return (
    <FlexBaseLayout flexType={flexType}>
      <div className={styles.bgForest}>
        <Forest />
      </div>
      <div
        className={[styles.fg, flexBaseLayoutStyles[flexStyleClass]].join(' ')}
      >
        {children}
      </div>
      <style jsx global>{`
        body {
          background-color: ${BG_COLOR};
        }
      `}</style>
    </FlexBaseLayout>
  );
}
