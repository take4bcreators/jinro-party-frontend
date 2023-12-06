'use client';
import DayPhase from '@/app/mt/playing/state/DayPhase';
import Button from '@/components/elements/button';
import StateTitle from '@/components/elements/stateTitle';
import PlayingLayout from '@/components/layouts/playingLayout';
import { ButtonStyle } from '@/config/buttonStyle';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { PlayingLayoutStyle } from '@/config/playingLayoutStyle';
import { StateTitleStyle } from '@/config/stateTitleStyle';

export default function Home(): JSX.Element {
  return <DayPhase timerState={'start'} initialCount={'300000'} />;
}
