'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-4 text-center">
      <Image
        src="/elegan-shape.svg"
        alt="Elegant Shape"
        width={200}
        height={100}
        className="mb-4"
      />
      <h2 className="font-tangerine text-6xl text-[#ad8330] md:text-8xl">
        Undangan Bona Taon
      </h2>
      <h1 className="font-modern text-5xl font-black uppercase text-white md:text-7xl">
        BISUKMA GROUP
      </h1>
      <div className="mt-4 flex flex-col items-center">
        <p className="font-modern text-lg font-semibold uppercase text-white md:text-xl">
          Bergerak dan Bangkit bersama
        </p>
        <p className="font-modern text-base text-white/90 md:text-lg">
          Meraih Harapan Melalui Kolaborasi
        </p>
      </div>
      <Button
        className="mt-8 rounded-full border-transparent font-normal text-white hover:bg-[#9c762a]"
        style={{ backgroundColor: '#ad8330' }}
      >
        Buka undangan
      </Button>
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
