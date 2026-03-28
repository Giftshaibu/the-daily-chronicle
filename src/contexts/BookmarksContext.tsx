import React, { useState, useEffect } from "react";
import { BookmarksContext } from "@/contexts/bookmarks-context";

export const BookmarksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
        const saved = localStorage.getItem("daily-chronicle-bookmarks");
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse bookmarks from storage");
                return [];
            }
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem("daily-chronicle-bookmarks", JSON.stringify(bookmarkedIds));
    }, [bookmarkedIds]);

    const addBookmark = (articleId: string) => {
        setBookmarkedIds((prev) => {
            if (!prev.includes(articleId)) {
                return [...prev, articleId];
            }
            return prev;
        });
    };

    const removeBookmark = (articleId: string) => {
        setBookmarkedIds((prev) => prev.filter((id) => id !== articleId));
    };

    const toggleBookmark = (articleId: string) => {
        setBookmarkedIds((prev) => {
            if (prev.includes(articleId)) {
                return prev.filter((id) => id !== articleId);
            }
            return [...prev, articleId];
        });
    };

    const isBookmarked = (articleId: string) => bookmarkedIds.includes(articleId);

    return (
        <BookmarksContext.Provider
            value={{
                bookmarkedIds,
                addBookmark,
                removeBookmark,
                toggleBookmark,
                isBookmarked,
            }}
        >
            {children}
        </BookmarksContext.Provider>
    );
};
