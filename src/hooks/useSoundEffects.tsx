"use client";

import { useRef, useEffect, useCallback } from "react";

type Sounds = Record<string, HTMLAudioElement>;

const sounds = {
  reward: "/sfx/bonus-sound.mp3",
  lesson: "/sfx/start-lesson.mp3",
  modal: "/sfx/game-bonus.mp3",
  level_complete: "/sfx/level-complete.mp3",
};

export default function useSoundEffects() {
  const audioRefs = useRef({});

  const playSound = useCallback((soundName: string) => {
    const audio = (audioRefs.current as Sounds)[soundName];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio
        .play()
        .catch((e: unknown) => console.error("Error playing sound:", e));
    } else {
      console.warn(`Sound '${soundName}' not found.`);
    }
  }, []);

  useEffect(() => {
    (Object.keys(sounds) as Array<keyof typeof sounds>).forEach((soundName) => {
      (audioRefs.current as Record<keyof typeof sounds, HTMLAudioElement>)[
        soundName
      ] = new Audio(sounds[soundName as keyof typeof sounds]);
    });

    return () => {
      Object.values(audioRefs.current as Sounds).forEach((audio) => {
        audio.pause();
        audio.src = "";
      });
      audioRefs.current = {};
    };
  }, []);

  return { playSound };
}
