'use client';

import { createContext, useContext, useRef, useState, useEffect } from 'react';

type AudioContextType = {
  play: () => void;
  pause: () => void;
  isPlaying: boolean;
};

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Initialize Audio on the client side only
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio('/music.mp3');
      audio.loop = true;
      audio.volume = 0.6;
      audioRef.current = audio;
    }
  }, []);


  const play = async () => {
    if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (e) {
          console.error('Autoplay was prevented.', e);
        }
    }
  };

  const pause = () => {
    if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
    }
  };

  return (
    <AudioContext.Provider value={{ play, pause, isPlaying }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error('useAudio must be used inside AudioProvider');
  return ctx;
}
