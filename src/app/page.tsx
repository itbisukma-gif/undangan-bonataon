'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-4 text-center">
      <Image
        src="/elegan-shape.svg"
        alt="Elegant Shape"
        width={200}
        height={100}
        className="mb-4"
      />
      <h2 className="font-tangerine text-5xl text-[#ad8330] md:text-7xl">
        Undangan Bona Taon
      </h2>
      <h1 className="font-modern text-4xl font-black uppercase text-white md:text-6xl">
        BISUKMA GROUP
      </h1>
      <p className="font-modern mt-2 text-lg font-bold text-white md:text-xl">
        Bergerak dan Bangkit bersama
      </p>
      <p className="font-modern mt-1 text-base text-white md:text-lg">
        Meraih Harapan Melalui Kolaborasi
      </p>
      <Button
        className="mt-8 rounded-full border-transparent text-white hover:bg-[#9c762a]"
        style={{ backgroundColor: '#ad8330' }}
      >
        Buka undangan
      </Button>
    </div>
  );
}
