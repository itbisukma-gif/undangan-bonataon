'use client';

import { useState } from 'react';
import Image from 'next/image';
import CountdownTimer from '@/components/CountdownTimer';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function InvitationPage() {
  const targetDate = '2026-01-17T00:00:00';
  const [showCountdown, setShowCountdown] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.8 } },
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-4 text-center text-white">
      <AnimatePresence mode="wait">
        {showCountdown ? (
          <motion.div
            key="countdown"
            className="flex flex-col items-center justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2 className="mb-4 text-lg font-semibold">
              Hitung mundur acara bonataon
            </h2>
            <CountdownTimer targetDate={targetDate} />
            <Button
              variant="ghost"
              size="icon"
              className="mt-8 rounded-full text-white"
              onClick={() => setShowCountdown(false)}
            >
              <ArrowUp className="h-6 w-6" />
              <span className="sr-only">Tampilkan Undangan</span>
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="invitation"
            className="flex flex-col items-center justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div
              className="mb-8 rounded-lg border bg-white/10 p-4"
              style={{ borderColor: '#ad8330' }}
            >
              <p className="text-lg">Yang terhormat</p>
              <p className="text-2xl font-bold">"Nama undangan"</p>
            </div>

            <h1 className="text-4xl font-bold">Kami dari Bisukma Group</h1>
            <p className="mt-4 max-w-2xl">
              Mengundang Bapak/Ibu untuk hadir dan memeriahkan acara Bona Taon
              ini. Kehadiran dan partisipasi bapak/ibu dalam acara ini adalah
              sebuah kehormatan bagi kami.
            </p>
            <Button
              variant="ghost"
              size="icon"
              className="mt-8 rounded-full text-white"
              onClick={() => setShowCountdown(true)}
            >
              <ArrowDown className="h-6 w-6" />
              <span className="sr-only">Lihat Hitung Mundur</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

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
