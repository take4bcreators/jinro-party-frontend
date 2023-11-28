import PlayingLayout from '@/components/layouts/playingLayout';
import { PlayingLayoutStyle } from '@/config/playingLayoutStyle';

export default function Home(): JSX.Element {
  return (
    <PlayingLayout type={PlayingLayoutStyle.SkyBlue}>
      <h1>Debate Time</h1>
      <p>
        今夜処刑する人を
        <wbr />
        話し合いで決めてください
      </p>
    </PlayingLayout>
  );
}
