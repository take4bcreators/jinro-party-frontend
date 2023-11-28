import PlayingLayout from '@/components/layouts/playingLayout';
import { PlayingLayoutStyle } from '@/config/playingLayoutStyle';

export default function Home(): JSX.Element {
  return (
    <PlayingLayout type={PlayingLayoutStyle.Purple}>
      <h1>Voting Result</h1>
      <p>モニターに注目してください</p>
    </PlayingLayout>
  );
}
