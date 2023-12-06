'use client';
import DayPhase from '@/app/mt/playing/state/DayPhase';
import DayPhaseEnd from '@/app/mt/playing/state/DayPhaseEnd';
import DayPhaseStart from '@/app/mt/playing/state/DayPhaseStart';
import ExileAnnouncement from '@/app/mt/playing/state/ExileAnnouncement';
import MorningPhaseStart from '@/app/mt/playing/state/MorningPhaseStart';
import NightActionResult from '@/app/mt/playing/state/NightActionResult';
import NightPhase from '@/app/mt/playing/state/NightPhase';
import NightPhaseEnd from '@/app/mt/playing/state/NightPhaseEnd';
import NightPhaseStart from '@/app/mt/playing/state/NightPhaseStart';
import VoteResult from '@/app/mt/playing/state/VoteResult';
import Voting from '@/app/mt/playing/state/Voting';
import VotingEnd from '@/app/mt/playing/state/VotingEnd';
import Button from '@/components/elements/button';
import StateTitle from '@/components/elements/stateTitle';
import PlayingLayout from '@/components/layouts/playingLayout';
import { ButtonStyle } from '@/config/buttonStyle';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { PlayingLayoutStyle } from '@/config/playingLayoutStyle';
import { StateTitleStyle } from '@/config/stateTitleStyle';

export default function Home(): JSX.Element {
  // return <DayPhaseStart />;
  // return <DayPhase timerState={'start'} initialCount={'300000'} />;
  // return <DayPhaseEnd />;
  // return <Voting timerState={'start'} initialCount={'300000'} />;
  // return <VotingEnd />;
  // return <VoteResult />;
  // return <ExileAnnouncement timerState={'start'} initialCount={'10000'} />;
  // return <NightPhaseStart />;
  // return <NightPhase timerState={'start'} initialCount={'300000'} />;
  // return <NightPhaseEnd />;
  // return <MorningPhaseStart />;
  return <NightActionResult />;
}
