import { useEffect, useState } from 'react';
import { Racing_Sans_One } from 'next/font/google';
import { Roboto_Mono } from 'next/font/google';
import { TimerStyle } from '@/config/timerStyle';
import styles from '@/styles/components/elements/timer.module.scss';

const racingsans = Racing_Sans_One({
  weight: ['400'],
  subsets: ['latin'],
});

const robotomono = Roboto_Mono({
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

type Props = {
  timerState: string;
  initialCount: number;
  timerStyle?: TimerStyle;
};

export default function Timer({
  timerState,
  initialCount,
  timerStyle = TimerStyle.Default,
}: Props): JSX.Element {
  const [count, setCount] = useState(initialCount);
  const [isRunning, setIsRunning] = useState(false);

  const TIMER_STYLE_ID = 'timer';
  const styleClass = styles[TIMER_STYLE_ID + timerStyle];
  const fontClass = (() => {
    switch (timerStyle) {
      case TimerStyle.NoStyle:
        return '';
      default:
        // return racingsans.className;
        return robotomono.className;
    }
  })();

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

  return <span className={[styleClass, fontClass].join(' ')}>{count}</span>;
}
