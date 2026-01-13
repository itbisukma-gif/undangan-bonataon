'use client';

import { Header } from '@/components/header';

export default function HomePage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-grow flex-col items-center justify-center text-center">
        <p className="font-handwriting text-2xl text-white/90">
          Undangan Bona Taon
        </p>
        <h1 className="font-modern mt-2 text-7xl font-black tracking-wider text-white">
          BISUKMA GROUP
        </h1>
      </main>
    </div>
  );
}
