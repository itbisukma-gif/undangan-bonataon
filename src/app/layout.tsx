import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter, Poppins, Tangerine } from 'next/font/google';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const tangerine = Tangerine({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-tangerine',
});
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'CorpConnect Invite',
  description: 'Create and manage corporate event invitations with ease.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'relative min-h-screen bg-background font-sans antialiased',
          inter.variable,
          tangerine.variable,
          poppins.variable
        )}
      >
        <Image
          src="/Logo Bisukma Group.svg"
          alt="Bisukma Group Logo"
          width={120}
          height={120}
          className="absolute top-4 left-4 z-10"
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
