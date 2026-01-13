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
  const wasPlayingRef = useRef(false);

  // Initialize Audio on the client side only
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio('/music.mp3');
      audio.loop = true;
      audio.volume = 0.6;
      audioRef.current = audio;
    }
  }, []);

  // Effect to handle tab visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab is not visible
        if (isPlaying) {
          wasPlayingRef.current = true; // Remember that it was playing
          audioRef.current?.pause();
          setIsPlaying(false);
        }
      } else {
        // Tab is visible again
        if (wasPlayingRef.current) {
          audioRef.current?.play().catch(e => console.warn("Could not resume audio", e));
          setIsPlaying(true);
          wasPlayingRef.current = false; // Reset the flag
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPlaying]);


  const play = async () => {
    if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          if (error instanceof DOMException && error.name === 'NotSupportedError') {
            console.warn(
              'Audio playback failed: The source file ("/music.mp3") is likely missing or in an unsupported format. Please add the audio file to the /public directory.'
            );
          } else {
            console.error('Audio playback was prevented.', error);
          }
          setIsPlaying(false); // Ensure state is correct on error
        }
    }
  };

  const pause = () => {
    if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
        wasPlayingRef.current = false; // also reset if user manually pauses
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
