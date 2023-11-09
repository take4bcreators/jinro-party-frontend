import { useEffect, useState } from 'react';

type Props = {
  timerState: string;
  initialCount: number;
};

export default function Timer({
  timerState,
  initialCount,
}: Props): JSX.Element {
  const [count, setCount] = useState(initialCount);
  const [isRunning, setIsRunning] = useState(false);

  function start() {
    setIsRunning(true);
  }

  function pause() {
    setIsRunning(false);
  }

  function reset(initialCount: number) {
    setCount(initialCount);
    setIsRunning(false);
  }

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  useEffect(() => {
    switch (timerState) {
      case 'start':
        start();
        break;
      case 'pause':
        pause();
        break;
      case 'reset':
        reset(initialCount);
        break;
      default:
        break;
    }
  }, [timerState, initialCount]);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined = undefined;
    if (isRunning && count > 0) {
      timerId = setInterval(() => {
        if (count > 0) {
          setCount((prevCount) => prevCount - 1);
        }
      }, 1000);
    }
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [isRunning, count]);

  return <>{count}</>;
}
