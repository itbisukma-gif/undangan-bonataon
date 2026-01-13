'use client';

import { Header } from '@/components/header';

export default function HomePage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-grow flex-col items-center justify-center px-4 text-center">
        <p className="font-handwriting text-5xl text-white/90 md:text-7xl">
          Undangan Bona Taon
        </p>
        <h1 className="font-modern mt-2 text-4xl font-black tracking-wider text-white md:text-6xl">
          BISUKMA GROUP
        </h1>
      </main>
    </div>
  );
}
