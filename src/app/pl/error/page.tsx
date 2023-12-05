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
      <p>エラーが発生しました</p>
      <Link href="./?site=pl">
        <Button type={ButtonStyle.Blue}>戻る</Button>
      </Link>
    </DarkForestLayout>
  );
}
