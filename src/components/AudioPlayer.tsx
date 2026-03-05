import { useState, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  X,
  Headphones,
} from "lucide-react";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

const GlobalAudioPlayer = () => {
  const { currentArticle, isOpen, closePlayer } = useAudioPlayer();

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [muted, setMuted] = useState(false);

  // States for scrolling logic
  const [isScrolled, setIsScrolled] = useState(false);
  const [userToggledOpen, setUserToggledOpen] = useState(false); // allows expanding when scrolled down

  const totalTime = 300; // 5 min mock

  // Reset on article change
  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setUserToggledOpen(true); // default to open when newly selected
  }, [currentArticle]);

  // Auto-play when opened
  useEffect(() => {
    if (isOpen && currentArticle) setIsPlaying(true);
  }, [isOpen, currentArticle]);

  // Handle scroll logic
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ticker
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalTime) {
            setIsPlaying(false);
            return 0;
          }
          const next = prev + 1;
          setProgress((next / totalTime) * 100);
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    setProgress(pct);
    setCurrentTime((pct / 100) * totalTime);
  };

  const skip = (delta: number) => {
    const next = Math.max(0, Math.min(totalTime, currentTime + delta));
    setCurrentTime(next);
    setProgress((next / totalTime) * 100);
  };

  if (!isOpen || !currentArticle) return null;

  // Determine if we should show the minimized state
  // Minimized if we scrolled down AND the user hasn't explicitly toggled it open
  const isMinimized = isScrolled && !userToggledOpen;

  // ── MINIMIZED CIRCULAR BUTTON (FLOATING BOTTOM RIGHT) ──
  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 animate-in fade-in slide-in-from-bottom flex-col gap-2">
        <button
          onClick={closePlayer}
          className="bg-foreground text-background rounded-full p-2 shadow-xl hover:scale-105 transition-transform"
          aria-label="Close listener"
        >
          <X className="h-4 w-4" />
        </button>
        <button
          onClick={() => setUserToggledOpen(true)}
          className="bg-primary text-primary-foreground rounded-full p-4 shadow-2xl hover:bg-primary/90 transition-all hover:scale-105"
          aria-label="Maximize player"
        >
          {isPlaying ? (
            <Headphones className="h-6 w-6 animate-pulse" />
          ) : (
            <Play className="h-6 w-6 ml-0.5 fill-current" />
          )}
        </button>
      </div>
    );
  }

  // ── FULL PLAYER (FIXED TO BOTTOM) ──
  return (
    <>
      {/* Backdrop for mobile tap-away (unless user opens it purposefully) */}
      <div
        className="fixed inset-0 z-40 bg-black/30 md:hidden"
        onClick={() => {
          if (isScrolled) setUserToggledOpen(false); // Re-minimize instead of closing if scrolled
          else closePlayer();
        }}
      />

      {/* Player panel — slides up from bottom */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-foreground text-background shadow-2xl
                   rounded-t-2xl md:rounded-none md:rounded-t-xl
                   animate-in slide-in-from-bottom duration-300"
      >
        <div className="px-4 md:px-8 pb-6 pt-4 max-w-3xl mx-auto">
          {/* ── Header row */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Headphones className="h-4 w-4 text-primary shrink-0" />
              <p className="font-body text-xs text-background/50 uppercase tracking-widest flex items-center gap-1">
                Now Listening {isPlaying && <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* If scrolled, X minimizes instead of closing */}
              <button
                onClick={() => {
                  if (isScrolled) setUserToggledOpen(false); // minimize
                  else closePlayer(); // full close
                }}
                className="p-1.5 rounded-full hover:bg-background/10 transition-colors"
                aria-label={isScrolled ? "Minimize player" : "Close player"}
              >
                <X className="h-5 w-5 text-background/80" />
              </button>
            </div>
          </div>

          {/* ── Title & author */}
          <h3 className="font-headline font-bold text-base md:text-lg leading-tight line-clamp-2 mb-0.5 pr-8">
            {currentArticle.title}
          </h3>
          <p className="font-body text-xs text-background/50 mb-4">
            {currentArticle.authorName} · {currentArticle.categoryName}
          </p>

          {/* ── Progress bar */}
          <div
            className="w-full bg-background/20 rounded-full h-1.5 cursor-pointer mb-1 group"
            onClick={handleSeek}
          >
            <div
              className="bg-primary h-1.5 rounded-full transition-all relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <div className="flex justify-between text-xs font-body text-background/40 mb-4">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(totalTime)}</span>
          </div>

          {/* ── Controls row */}
          <div className="flex items-center justify-between">
            {/* Volume */}
            <div className="flex items-center gap-2 flex-1 hidden md:flex">
              <button
                onClick={() => setMuted(!muted)}
                className="hover:text-primary transition-colors"
              >
                {muted ? (
                  <VolumeX className="h-4 w-4 text-background/60" />
                ) : (
                  <Volume2 className="h-4 w-4 text-background/60" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={100}
                value={muted ? 0 : volume}
                onChange={(e) => {
                  setVolume(Number(e.target.value));
                  setMuted(false);
                }}
                className="w-20 accent-primary cursor-pointer"
              />
            </div>

            {/* Playback controls */}
            <div className="flex items-center gap-5 flex-1 justify-center">
              <button
                onClick={() => skip(-15)}
                className="hover:text-primary transition-colors flex flex-col items-center gap-0.5"
              >
                <SkipBack className="h-5 w-5" />
                <span className="text-[9px] font-body text-background/40">15s</span>
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-primary text-primary-foreground rounded-full p-3.5 hover:bg-primary/90 transition-colors shadow-lg"
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6 fill-current" />
                ) : (
                  <Play className="h-6 w-6 fill-current ml-1" />
                )}
              </button>

              <button
                onClick={() => skip(15)}
                className="hover:text-primary transition-colors flex flex-col items-center gap-0.5"
              >
                <SkipForward className="h-5 w-5" />
                <span className="text-[9px] font-body text-background/40">15s</span>
              </button>
            </div>

            {/* Spacer */}
            <div className="flex-1 hidden md:block" />
          </div>
        </div>
      </div>
    </>
  );
};

export default GlobalAudioPlayer;
