'use client';
import Link from 'next/link';
import Button from '@/components/elements/button';
import Logo from '@/components/elements/logo';
import DarkForestLayout from '@/components/layouts/darkForestLayout';
import { ButtonStyle } from '@/config/buttonStyle';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { LogoStyle } from '@/config/logoStyle';

export default function Home(): JSX.Element {
  return (
    <DarkForestLayout flexType={FlexBaseLayoutStyle.Default}>
      <Logo type={LogoStyle.Default} />
      <Link href="/pl/playing/">
        <Button type={ButtonStyle.Blue}>ゲーム再開</Button>
      </Link>
    </DarkForestLayout>
  );
}
