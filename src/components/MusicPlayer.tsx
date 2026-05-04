import { useState, useRef, useEffect, useCallback } from 'react'
import {
  FaMusic,
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaVolumeUp,
  FaTimes,
} from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/useTheme'
import { musicTracks } from '@/data/portfolio'
import { useTranslation } from 'react-i18next'

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function MusicPlayer() {
  const { theme } = useTheme()
  const { t } = useTranslation()
  const audioRef = useRef<HTMLAudioElement>(null)
  const hasAutoplayedRef = useRef(false)

  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(musicTracks[0]?.volume ?? 0.7)
  // true while waiting for first user interaction to trigger autoplay
  const [awaitingInteraction, setAwaitingInteraction] = useState(true)

  const currentTrack = musicTracks[currentTrackIndex]

  const play = useCallback(async () => {
    try {
      await audioRef.current?.play()
      setIsPlaying(true)
    } catch {
      setIsPlaying(false)
    }
  }, [])

  const pause = useCallback(() => {
    audioRef.current?.pause()
    setIsPlaying(false)
  }, [])

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }, [isPlaying, play, pause])

  const playTrack = useCallback(
    (index: number) => {
      const track = musicTracks[index]
      const trackVolume = track.volume ?? volume
      setCurrentTrackIndex(index)
      setCurrentTime(0)
      setVolume(trackVolume)
      if (audioRef.current) {
        audioRef.current.volume = trackVolume
      }
      setTimeout(() => play(), 50)
    },
    [play, volume]
  )

  const nextTrack = useCallback(() => {
    const next = (currentTrackIndex + 1) % musicTracks.length
    playTrack(next)
  }, [currentTrackIndex, playTrack])

  const prevTrack = useCallback(() => {
    const prev = (currentTrackIndex - 1 + musicTracks.length) % musicTracks.length
    playTrack(prev)
  }, [currentTrackIndex, playTrack])

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    audioRef.current.currentTime = ratio * duration
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value)
    setVolume(v)
    if (audioRef.current) {
      audioRef.current.volume = v
    }
  }

  // Sync volume to audio element whenever it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  // Autoplay on first user interaction (browsers block autoplay until a gesture)
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (hasAutoplayedRef.current) return
      hasAutoplayedRef.current = true
      setAwaitingInteraction(false)
      setIsOpen(true)
      play()
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)
      document.removeEventListener('scroll', handleFirstInteraction, true)
    }

    document.addEventListener('click', handleFirstInteraction)
    document.addEventListener('keydown', handleFirstInteraction)
    document.addEventListener('scroll', handleFirstInteraction, { capture: true, passive: true })

    return () => {
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)
      document.removeEventListener('scroll', handleFirstInteraction, true)
    }
  }, [play])

  if (musicTracks.length === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Hidden audio element */}
      <audio
        src={currentTrack.src}
        ref={audioRef}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
        onEnded={nextTrack}
      />

      {/* Glassmorphism Modal */}
      <div
        className={`absolute bottom-16 right-0 w-80 rounded-2xl p-4 transition-all duration-300 origin-bottom-right ${
          theme === 'dark' ? 'glass-dark' : 'glass-light'
        } ${
          isOpen
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <FaMusic className="h-3.5 w-3.5 text-primary" />
            {t('music.nowPlaying')}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Track Info */}
        <div className="mb-3">
          <p className="font-semibold text-foreground truncate">{currentTrack.title}</p>
          <p className="text-sm text-muted-foreground truncate">{currentTrack.artist}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <div
            className="w-full h-1.5 bg-muted rounded-full cursor-pointer group"
            onClick={handleSeek}
          >
            <div
              className="h-full bg-primary rounded-full relative transition-all"
              style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-center gap-4 mb-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={prevTrack}
            aria-label="Previous track"
          >
            <FaStepBackward className="h-3.5 w-3.5" />
          </Button>

          <Button
            variant="default"
            size="icon"
            className="h-10 w-10 rounded-full"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <FaPause className="h-4 w-4" />
            ) : (
              <FaPlay className="h-4 w-4 ml-0.5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={nextTrack}
            aria-label="Next track"
          >
            <FaStepForward className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2 mb-4">
          <FaVolumeUp className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
          />
        </div>

        {/* Track List */}
        <div className="border-t border-border/50 pt-3 max-h-40 overflow-y-auto">
          {musicTracks.map((track, index) => (
            <button
              key={track.id}
              onClick={() => playTrack(index)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                index === currentTrackIndex
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'hover:bg-muted/50 text-foreground'
              }`}
            >
              <FaMusic className="h-3 w-3 shrink-0" />
              <span className="truncate">{track.title}</span>
              <span className="text-xs text-muted-foreground truncate ml-auto">
                {track.artist}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Floating Button */}
      <div className="relative">
        {awaitingInteraction && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
          </span>
        )}
        <Button
          size="icon"
          className={`h-14 w-14 rounded-full shadow-lg ${awaitingInteraction ? 'animate-bounce' : isPlaying ? 'animate-pulse' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle music player"
        >
          <FaMusic className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
