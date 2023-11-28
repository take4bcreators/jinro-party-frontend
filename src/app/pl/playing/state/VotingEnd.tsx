import PlayingLayout from '@/components/layouts/playingLayout';
import { PlayingLayoutStyle } from '@/config/playingLayoutStyle';

export default function Home(): JSX.Element {
  return (
    <PlayingLayout type={PlayingLayoutStyle.Orange}>
      <h1>投票終了</h1>
    </PlayingLayout>
  );
}
