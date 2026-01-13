'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Image from 'next/image';
import CountdownTimer from '@/components/CountdownTimer';

export default function InvitationPage() {
  const targetDate = '2026-01-17T00:00:00';

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 text-center text-white">
      <div
        className="mb-8 rounded-lg border bg-white/10 p-4"
        style={{ borderColor: '#ad8330' }}
      >
        <p className="text-lg">Yang terhormat</p>
        <p className="text-2xl font-bold">"Nama undangan"</p>
      </div>

      <h1 className="text-4xl font-bold">Kami dari Bisukma Group</h1>
      <p className="mt-4 max-w-2xl">
        Mengundang Bapak/Ibu untuk hadir dan memeriahkan acara Bona Taon ini.
        Kehadiran dan partisipasi bapak/ibu dalam acara ini adalah sebuah
        kehormatan bagi kami.
      </p>
      <div className="mt-12 w-full max-w-md">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem
            value="item-1"
            className="rounded-lg border bg-white/10 px-4"
            style={{ borderColor: '#ad8330' }}
          >
            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
              Hitung mundur acara bonataon
            </AccordionTrigger>
            <AccordionContent>
              <div className="pt-4">
                <CountdownTimer targetDate={targetDate} />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
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
