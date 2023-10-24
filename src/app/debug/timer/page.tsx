'use client';
import TimerApp from './TimerApp';

export default function IndexPage() {
  return (
    <div>
      <h1>Timer App</h1>
      <TimerApp initialCount={60} />
    </div>
  );
}
