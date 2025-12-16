import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '保險互動工具',
  description: 'DISC 測驗與一生收入估算工具',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant">
      <body className="min-h-screen bg-slate-50">
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
