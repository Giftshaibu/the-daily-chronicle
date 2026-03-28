import { useState, ReactNode } from "react";
import { Post } from "@/types/api";
import { AudioPlayerContext } from "@/hooks/audio-player-context";

export const AudioPlayerProvider = ({ children }: { children: ReactNode }) => {
    const [currentArticle, setCurrentArticle] = useState<Post | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const playArticle = (article: Post) => {
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
