'use client';

import { Header } from '@/components/header';

export default function HomePage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-grow"></main>
    </div>
  );
}
