import Timer from '@/components/elements/Timer';
import { useRef } from 'react';

type Props = {
  timerState: string;
  initialCount: string;
};

export default function Home({ timerState, initialCount }: Props): JSX.Element {
  const count = useRef(0);
  let timerCount = 0;
  if (initialCount === '') {
    timerCount = count.current;
  } else {
    timerCount = parseInt(initialCount) * 0.001;
    count.current = timerCount;
  }

  return (
    <>
      <h1>夜のフェーズ</h1>
      <p>各自の端末で操作してください</p>
      <p>残り時間..</p>
      <p>
        <Timer timerState={timerState} initialCount={timerCount} />
      </p>
    </>
  );
}
