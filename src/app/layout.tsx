import 'ress';
import '@/styles/app/globals.scss';
import { Noto_Sans_JP } from 'next/font/google';
import type { Metadata } from 'next';

const notojp = Noto_Sans_JP({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'WOLFFICE',
  description: 'パーティ向け人狼ツール',
  icons: [{ rel: 'icon', url: '/images/favicon.ico' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={notojp.className}>{children}</body>
    </html>
  );
}
