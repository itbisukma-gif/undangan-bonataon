'use client';

import { Header } from '@/components/header';

export default function HomePage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-grow flex-col items-center justify-center px-4 text-center">
        <p className="font-handwriting text-6xl text-white/90 md:text-8xl">
          Undangan Bona Taon
        </p>
        <h1 className="font-modern mt-2 text-5xl font-black tracking-wider text-white md:text-7xl">
          BISUKMA GROUP
        </h1>
      </main>
    </div>
  );
}
