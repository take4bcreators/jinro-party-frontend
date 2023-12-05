'use client';
import Button from '@/components/elements/button';
import { ButtonStyle } from '@/config/buttonStyle';
import StateTitle from '@/components/elements/stateTitle';
import { StateTitleStyle } from '@/config/stateTitleStyle';
import PlayingLayout from '@/components/layouts/playingLayout';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { PlayingLayoutStyle } from '@/config/playingLayoutStyle';

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
