import { createContext, useContext, useState, ReactNode } from "react";
import { Article } from "@/data/mockData";

interface AudioPlayerContextType {
    currentArticle: Article | null;
    isOpen: boolean;
    playArticle: (article: Article) => void;
    closePlayer: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | null>(null);

export const AudioPlayerProvider = ({ children }: { children: ReactNode }) => {
    const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const playArticle = (article: Article) => {
        setCurrentArticle(article);
        setIsOpen(true);
    };

    const closePlayer = () => {
        setIsOpen(false);
    };

    return (
        <AudioPlayerContext.Provider value={{ currentArticle, isOpen, playArticle, closePlayer }}>
            {children}
        </AudioPlayerContext.Provider>
    );
};

export const useAudioPlayer = () => {
    const ctx = useContext(AudioPlayerContext);
    if (!ctx) throw new Error("useAudioPlayer must be used within AudioPlayerProvider");
    return ctx;
};
