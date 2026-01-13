'use client';

import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import Link from 'next/link';

export default function InvitationPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-4 text-center text-white">
      <h1 className="text-4xl font-bold">Halaman Undangan</h1>
      <p className="mt-4 max-w-2xl">
        Ini adalah halaman utama untuk undangan Anda. Anda dapat menambahkan semua
        detail acara di sini, seperti tanggal, waktu, lokasi, dan lainnya.
      </p>
    </div>
  );
}
