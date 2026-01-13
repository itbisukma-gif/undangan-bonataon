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
      <CountdownTimer targetDate={targetDate} />
      <h1 className="text-4xl font-bold mt-8">Halaman Undangan</h1>
      <p className="mt-4 max-w-2xl">
        Ini adalah halaman utama untuk undangan Anda. Anda dapat menambahkan semua
        detail acara di sini, seperti tanggal, waktu, lokasi, dan lainnya.
      </p>
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
