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
      <Button className="mt-8 rounded-full">Buka undangan</Button>
    </div>
  );
}
