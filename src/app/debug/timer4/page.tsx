'use client';
import { useState } from 'react';
import TimerApp from './TimerApp';

export default function IndexPage() {
  const [timerStatus, setTimerStatus] = useState('start');
  const [initialCount, setInitialCount] = useState(60);

  return (
    <div>
      <h1>Timer App</h1>
      <p>
        <TimerApp initialCount={initialCount} status={timerStatus} />
      </p>
      <button
        onClick={() => {
          setTimerStatus('start');
        }}
      >
        Start
      </button>{' '}
      <button
        onClick={() => {
          setTimerStatus('pause');
        }}
      >
        Pause
      </button>{' '}
      <button
        onClick={() => {
          setTimerStatus('reset');
        }}
      >
        Reset
      </button>{' '}
      <button
        onClick={() => {
          setInitialCount(60);
        }}
      >
        60sec.
      </button>{' '}
      <button
        onClick={() => {
          setInitialCount(20);
        }}
      >
        20sec.
      </button>{' '}
      <button
        onClick={() => {
          setInitialCount(5);
        }}
      >
        5sec.
      </button>{' '}
    </div>
  );
}
