import { useEffect, useState } from 'react';

type Props = {
  initialCount: number;
};

// TimerAppというFunctional Componentを定義します。Props型のinitialCountを受け取ります
export default function TimerApp({ initialCount }: Props): JSX.Element {
  const [count, setCount] = useState(initialCount);
  const [isRunning, setIsRunning] = useState(false);

  function start() {
    setIsRunning(true);
  }

  function pause() {
    setIsRunning(false);
  }

  function reset() {
    setCount(initialCount);
    setIsRunning(false);
  }

  function tick() {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  }

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;

    if (isRunning && count > 0) {
      timerId = setInterval(() => {
        tick();
      }, 1000);
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [isRunning, count]);

  return (
    <div>
      <div>{count}</div>
      <button onClick={start}>Start</button>{' '}
      <button onClick={pause}>Pause</button>{' '}
      <button onClick={reset}>Reset</button>{' '}
    </div>
  );
}
