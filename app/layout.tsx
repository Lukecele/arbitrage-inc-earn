import type {Metadata} from 'next';
import './globals.css';
import { Web3Provider } from '@/components/Web3Provider';

export const metadata: Metadata = {
  title: 'BSC Yield & Swap',
  description: 'Professional BSC Strategy Manager',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-50 min-h-screen" suppressHydrationWarning>
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
