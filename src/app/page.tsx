'use client';

import { Header } from '@/components/header';

export default function HomePage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-grow flex-col items-center justify-center text-center">
        <h1 className="font-handwriting text-7xl text-white">
          Undangan Bona Taon
        </h1>
        <p className="font-modern mt-4 text-2xl tracking-widest text-white/90">
          BISUKMA GROUP
        </p>
      </main>
    </div>
  );
}
