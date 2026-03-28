import { createContext, useContext } from "react";
import { Post } from "@/types/api";

export interface AudioPlayerContextType {
  currentArticle: Post | null;
  isOpen: boolean;
  playArticle: (article: Post) => void;
  closePlayer: () => void;
}

export const AudioPlayerContext = createContext<AudioPlayerContextType | null>(null);

export const useAudioPlayer = () => {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx) {
    throw new Error("useAudioPlayer must be used within AudioPlayerProvider");
  }

  return ctx;
};
