'use client';
import { useEffect, useState } from 'react';
import { TimerService } from '@/utils/timerService';

export default function Home(): JSX.Element {
  const [count, setCount] = useState(60);
  const [isRunning, setIsRunning] = useState(false);

  // const [timerService, setTimerService] = useState(
  //   new TimerService(count, setCount, isRunning, setIsRunning)
  // );

  //  setCount関数をコンストラクタで受け取る、TimerServiceクラスを作る
  const timerService = new TimerService(
    count,
    setCount,
    isRunning,
    setIsRunning
  );

  function start() {
    timerService.start();
  }

  function pause() {
    timerService.pause();
  }

  function reset() {
    timerService.reset();
  }

  useEffect(() => {
    return timerService.runningTimer();
  }, [isRunning, count]);
  // useEffect(() => {
  //   return timerService.runningTimer();
  // }, [timerService]);

  return (
    <>
      <div>
        <div>{count}</div>
        <button onClick={start}>Start</button>{' '}
        <button onClick={pause}>Pause</button>{' '}
        <button onClick={reset}>Reset</button>{' '}
      </div>
    </>
  );
}
