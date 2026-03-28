import { createContext, useContext } from "react";

export interface BookmarksContextType {
  bookmarkedIds: string[];
  addBookmark: (articleId: string) => void;
  removeBookmark: (articleId: string) => void;
  toggleBookmark: (articleId: string) => void;
  isBookmarked: (articleId: string) => boolean;
}

export const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

export const useBookmarks = () => {
  const context = useContext(BookmarksContext);
  if (context === undefined) {
    throw new Error("useBookmarks must be used within a BookmarksProvider");
  }

  return context;
};
