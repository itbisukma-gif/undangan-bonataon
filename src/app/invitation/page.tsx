'use client';

import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import CountdownTimer from '@/components/CountdownTimer';

export default function InvitationPage() {
  const targetDate = '2026-01-17T00:00:00';

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 text-center text-white">
      <h1 className="text-4xl font-bold mt-8">Kami dari Bisukma Group</h1>
      <p className="mt-4 max-w-2xl">
        Mengundang Bapak/Ibu untuk hadir dan memeriahkan acara Bona Taon ini.
        Kehadiran dan partisipasi bapak/ibu dalam acara ini adalah sebuah
        kehormatan bagi kami.
      </p>
      <div className="mt-12">
        <p className="mb-2 text-lg font-semibold">
          Hitung mundur acara bonataon
        </p>
        <CountdownTimer targetDate={targetDate} />
      </div>
      <Image
        src="/2026.svg"
        alt="2026"
        width={80}
        height={80}
        className="absolute bottom-8 right-8"
      />
    </div>
  );
}
