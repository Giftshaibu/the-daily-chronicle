import { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  X,
  Headphones,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useAudioPlayer } from "@/hooks/audio-player-context";

const GlobalAudioPlayer = () => {
  const { currentArticle, isOpen, closePlayer } = useAudioPlayer();

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [muted, setMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isMinimized, setIsMinimized] = useState(false);

  // Reset and load new article audio
  useEffect(() => {
    if (currentArticle?.audioUrl) {
      if (audioRef.current) {
        audioRef.current.src = currentArticle.audioUrl;
        audioRef.current.load();
      }
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
      setIsMinimized(false); // default to open when newly selected
    }
  }, [currentArticle]);

  // Handle actual audio play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => console.error("Audio playback failed:", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muted;
    }
  }, [volume, muted]);

  // Auto-play when opened
  useEffect(() => {
    if (isOpen && currentArticle?.audioUrl) setIsPlaying(true);
  }, [isOpen, currentArticle]);

  // Audio Event Handlers
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration || 1;
      setCurrentTime(current);
      setProgress((current / duration) * 100);
    }
  };

  const handleLoadedData = () => {
    if (audioRef.current) {
      setTotalTime(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

  const formatTime = (s: number) => {
    if (isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const newTime = (pct / 100) * (audioRef.current.duration || totalTime);
      audioRef.current.currentTime = newTime;
      setProgress(pct);
      setCurrentTime(newTime);
    }
  };

  const skip = (delta: number) => {
    if (audioRef.current) {
      const duration = audioRef.current.duration || totalTime;
      let next = audioRef.current.currentTime + delta;
      next = Math.max(0, Math.min(duration, next));
      audioRef.current.currentTime = next;
      setCurrentTime(next);
      setProgress((next / duration) * 100);
    }
  };

  const stopAndClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    closePlayer();
  };

  if (!isOpen || !currentArticle) return null;

  // ── PLAYER UI (MINIMIZED / FULL) ──
  return (
    <>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={handleLoadedData}
        onEnded={handleEnded}
      />

      {isMinimized ? (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 animate-in fade-in slide-in-from-bottom">
          <button
            onClick={stopAndClose}
            className="bg-foreground text-background rounded-full p-2 shadow-xl hover:scale-105 transition-transform"
            aria-label="Stop audio"
          >
            <X className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-primary text-primary-foreground rounded-full p-4 shadow-2xl hover:bg-primary/90 transition-all hover:scale-105"
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
          >
            {isPlaying ? (
              <Pause className="h-6 w-6 fill-current" />
            ) : (
              <Play className="h-6 w-6 ml-0.5 fill-current" />
            )}
          </button>
          <button
            onClick={() => setIsMinimized(false)}
            className="bg-foreground text-background rounded-full p-2 shadow-xl hover:scale-105 transition-transform"
            aria-label="Expand player"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <>
          {/* Backdrop for mobile tap-away */}
          <div
            className="fixed inset-0 z-40 bg-black/30 md:hidden"
            onClick={() => setIsMinimized(true)}
          />

          {/* Player panel — slides up from bottom */}
          <div
            className="fixed bottom-0 left-0 right-0 z-50 bg-foreground text-background shadow-[0_0_40px_rgba(0,0,0,0.15)]
                   rounded-t-2xl 
                   md:left-auto md:right-8 md:bottom-8 md:w-[400px] md:rounded-2xl md:border md:border-background/10
                   animate-in slide-in-from-bottom duration-300"
          >
            <div className="px-5 md:px-6 pb-6 pt-5">
              {/* ── Header row */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Headphones className="h-4 w-4 text-primary shrink-0" />
                  <p className="font-body text-xs text-background/50 uppercase tracking-widest flex items-center gap-1">
                    Now Listening {isPlaying && <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="p-1.5 rounded-full hover:bg-background/10 transition-colors"
                    aria-label="Minimize player"
                  >
                    <ChevronDown className="h-5 w-5 text-background/80" />
                  </button>
                  <button
                    onClick={stopAndClose}
                    className="p-1.5 rounded-full hover:bg-background/10 transition-colors"
                    aria-label="Stop audio"
                  >
                    <X className="h-5 w-5 text-background/80" />
                  </button>
                </div>
              </div>

              {/* ── Title & author */}
              <h3 className="font-headline font-bold text-base md:text-lg leading-tight line-clamp-2 mb-1 pr-4">
                {currentArticle.title}
              </h3>
              <p className="font-body text-xs text-background/50 mb-5">
                {currentArticle.authorName} · {currentArticle.categoryName}
              </p>

              {/* ── Progress bar */}
              <div
                className="w-full bg-background/20 rounded-full h-1.5 cursor-pointer mb-1.5 group"
                onClick={handleSeek}
              >
                <div
                  className="bg-primary h-1.5 rounded-full transition-all relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <div className="flex justify-between text-xs font-body text-background/40 mb-5">
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
                    aria-label={muted ? "Unmute" : "Mute"}
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
                      if (Number(e.target.value) > 0) setMuted(false);
                    }}
                    className="w-16 accent-primary cursor-pointer hover:accent-primary/80 transition-all"
                    title={`Volume: ${volume}%`}
                  />
                </div>

                {/* Playback controls */}
                <div className="flex items-center gap-5 flex-1 justify-center md:justify-end">
                  <button
                    onClick={() => skip(-15)}
                    className="hover:text-primary transition-colors flex flex-col items-center gap-0.5"
                    title="Skip back 15s"
                  >
                    <SkipBack className="h-5 w-5" />
                    <span className="text-[9px] font-body text-background/40">15s</span>
                  </button>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-primary text-primary-foreground rounded-full p-3.5 hover:bg-primary/90 hover:scale-105 transition-all shadow-lg active:scale-95"
                    title={isPlaying ? "Pause" : "Play"}
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
                    title="Skip forward 15s"
                  >
                    <SkipForward className="h-5 w-5" />
                    <span className="text-[9px] font-body text-background/40">15s</span>
                  </button>
                </div>
                
                {/* Spacer to keep middle icons centered on mobile */}
                <div className="flex-1 md:hidden" />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default GlobalAudioPlayer;
