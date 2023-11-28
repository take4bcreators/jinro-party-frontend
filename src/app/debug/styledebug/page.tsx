'use client';
import Button from '@/components/elements/button';
import { ButtonStyle } from '@/config/buttonStyle';

export default function Home(): JSX.Element {
  return (
    <>
      <h1>STYLE TEST</h1>
      <Button type={ButtonStyle.Blue}>ここをクリック</Button>
    </>
  );
}
