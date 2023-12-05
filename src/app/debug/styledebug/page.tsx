'use client';
import Button from '@/components/elements/button';
import StateTitle from '@/components/elements/stateTitle';
import PlayingLayout from '@/components/layouts/playingLayout';
import { ButtonStyle } from '@/config/buttonStyle';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { PlayingLayoutStyle } from '@/config/playingLayoutStyle';
import { StateTitleStyle } from '@/config/stateTitleStyle';

export default function Home(): JSX.Element {
  return (
    <PlayingLayout
      flexType={FlexBaseLayoutStyle.Default}
      type={PlayingLayoutStyle.Dark}
    >
      <StateTitle type={StateTitleStyle.Default} title={'Style Debug'}>
        <p>スタイルデバッグ</p>
      </StateTitle>
    </PlayingLayout>
  );
}
