'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAudio } from '@/context/AudioContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function HomePage() {
  const searchParams = useSearchParams();
  const namaTamu = searchParams.get('to');
  const { play } = useAudio();

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-4 text-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center"
      >
        <motion.div variants={itemVariants}>
          <Image
            src="/elegan-shape.svg"
            alt="Elegant Shape"
            width={200}
            height={100}
            className="mb-4"
            priority
          />
        </motion.div>
        <motion.h2
          variants={itemVariants}
          className="font-tangerine text-6xl text-[#ad8330] md:text-8xl"
        >
          Undangan Bona Taon
        </motion.h2>
        <motion.h1
          variants={itemVariants}
          className="font-modern text-5xl font-black uppercase text-white md:text-7xl"
        >
          BISUKMA GROUP
        </motion.h1>
        <motion.div
          variants={itemVariants}
          className="mt-4 flex flex-col items-center"
        >
          <p className="font-modern text-lg font-semibold uppercase text-white md:text-xl">
            Bergerak dan Bangkit bersama
          </p>
          <p className="font-modern text-base text-white/90 md:text-lg">
            Meraih Harapan Melalui Kolaborasi
          </p>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Link
            href={
              namaTamu
                ? `/invitation?to=${encodeURIComponent(namaTamu)}`
                : '/invitation'
            }
          >
            <Button
              onClick={play}
              className="mt-8 rounded-full border-transparent font-normal text-white hover:bg-[#9c762a]"
              style={{ backgroundColor: '#ad8330' }}
            >
              Buka undangan
            </Button>
          </Link>
        </motion.div>
      </motion.div>
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
