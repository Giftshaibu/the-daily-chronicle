import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

interface AudioPlayerProps {
  title: string;
  author: string;
}

const AudioPlayer = ({ title, author }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const totalTime = 300; // 5 min mock

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

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-foreground text-background rounded-sm p-4 md:p-6">
      <p className="font-body text-xs text-background/60 uppercase tracking-wider mb-1">Now Playing</p>
      <h3 className="font-headline font-bold text-lg leading-tight">{title}</h3>
      <p className="font-body text-sm text-background/60 mt-1">{author}</p>

      <div className="mt-4">
        <div className="w-full bg-background/20 rounded-full h-1.5 cursor-pointer" onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const pct = ((e.clientX - rect.left) / rect.width) * 100;
          setProgress(pct);
          setCurrentTime((pct / 100) * totalTime);
        }}>
          <div
            className="bg-primary h-1.5 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs font-body text-background/50 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(totalTime)}</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 mt-4">
        <button onClick={() => setCurrentTime(Math.max(0, currentTime - 15))} className="hover:text-primary transition-colors">
          <SkipBack className="h-5 w-5" />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-primary text-primary-foreground rounded-full p-3 hover:bg-primary/90 transition-colors"
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </button>
        <button onClick={() => setCurrentTime(Math.min(totalTime, currentTime + 15))} className="hover:text-primary transition-colors">
          <SkipForward className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;
