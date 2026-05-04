import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { photos } from '@/data/portfolio'
import { FaChevronLeft, FaChevronRight, FaExpand } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import MediaViewer from '@/components/MediaViewer'

const INTERVAL_MS = 5000
const TICK_MS = 50
const RADIUS = 14
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const Photos = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPausedState, setIsPausedState] = useState(false)
  const [activeMedia, setActiveMedia] = useState<{ src: string; title: string } | null>(null)
  const isPaused = useRef(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimers = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (tickRef.current) clearInterval(tickRef.current)
    setProgress(0)

    tickRef.current = setInterval(() => {
      if (!isPaused.current) {
        setProgress((prev) => Math.min(prev + TICK_MS / INTERVAL_MS, 1))
      }
    }, TICK_MS)

    intervalRef.current = setInterval(() => {
      if (!isPaused.current) {
        setCurrentIndex((prev) => (prev + 1) % photos.length)
        setProgress(0)
      }
    }, INTERVAL_MS)
  }, [])

  const startInterval = startTimers

  useEffect(() => {
    startTimers()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (tickRef.current) clearInterval(tickRef.current)
    }
  }, [startTimers])

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentIndex(index)
      startInterval()
    },
    [startInterval]
  )

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
    startInterval()
  }, [startInterval])

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % photos.length)
    startInterval()
  }, [startInterval])

  return (
    <section id="photos" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('photos.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('photos.subtitle')}
            </p>
          </div>

          {/* Carousel */}
          <Card
            className="overflow-hidden"
            onMouseEnter={() => {
              isPaused.current = true
              setIsPausedState(true)
            }}
            onMouseLeave={() => {
              isPaused.current = false
              setIsPausedState(false)
            }}
          >
            {/* Image area */}
            <div className="relative h-[400px] md:h-[500px] bg-gradient-to-br from-primary/20 to-secondary/20">
              {photos.map((photo, index) => {
                const photoData = t(`data.photos.${photo.id}`, { returnObjects: true }) as {
                  title: string
                  description: string
                  category: string
                }

                return (
                  <div
                    key={photo.id}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                  >
                    {photo.image ? (
                      <div className="relative w-full h-full group/img">
                        <img
                          src={photo.image}
                          alt={photoData.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                        {/* Expand button — visible on hover */}
                        <button
                          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover/img:opacity-100 transition-opacity hover:bg-black/70"
                          onClick={() => setActiveMedia({ src: photo.image!, title: photoData.title })}
                          aria-label={`View ${photoData.title} fullscreen`}
                        >
                          <FaExpand className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <p className="text-4xl font-bold text-muted-foreground/20">
                          {photoData.title}
                        </p>
                      </div>
                    )}
                  </div>
                )
              })}

              {/* Prev / Next Arrows */}
              <div className="absolute inset-0 z-20 flex items-center justify-between p-4 pointer-events-none">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={goPrev}
                  aria-label="Previous photo"
                  className="rounded-full opacity-80 hover:opacity-100 pointer-events-auto"
                >
                  <FaChevronLeft />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={goNext}
                  aria-label="Next photo"
                  className="rounded-full opacity-80 hover:opacity-100 pointer-events-auto"
                >
                  <FaChevronRight />
                </Button>
              </div>
            </div>

            {/* Title / Description / Category / Timer */}
            <CardHeader>
              {(() => {
                const currentPhoto = t(`data.photos.${photos[currentIndex].id}`, {
                  returnObjects: true,
                }) as { title: string; description: string; category?: string }

                return (
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <CardTitle>{currentPhoto.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {currentPhoto.description}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-3 ml-2 shrink-0">
                      {currentPhoto.category && (
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm whitespace-nowrap">
                          {currentPhoto.category}
                        </span>
                      )}
                      {/* Circular countdown timer */}
                      <svg width="36" height="36" className="shrink-0">
                        <circle
                          cx="18"
                          cy="18"
                          r={RADIUS}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="text-muted-foreground/15"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r={RADIUS}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          className="text-primary"
                          strokeDasharray={CIRCUMFERENCE}
                          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
                          transform="rotate(-90 18 18)"
                          style={{ transition: isPausedState ? 'none' : `stroke-dashoffset ${TICK_MS}ms linear` }}
                        />
                        <text
                          x="18"
                          y="18"
                          textAnchor="middle"
                          dominantBaseline="central"
                          className="fill-primary text-[11px] font-semibold"
                        >
                          {Math.ceil((1 - progress) * (INTERVAL_MS / 1000))}
                        </text>
                      </svg>
                    </div>
                  </div>
                )
              })()}
            </CardHeader>
          </Card>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-primary w-8' : 'bg-muted-foreground/30 w-2'
                }`}
                aria-label={`Go to photo ${index + 1}`}
              />
            ))}
          </div>

          {/* See More Button */}
          <div className="text-center mt-6">
            <Button variant="outline" onClick={() => navigate('/gallery')}>
              {t('photos.seeMore')} &rarr;
            </Button>
          </div>
        </div>
      </div>

      <MediaViewer
        isOpen={activeMedia !== null}
        onClose={() => setActiveMedia(null)}
        type="image"
        src={activeMedia?.src ?? ''}
        title={activeMedia?.title}
      />
    </section>
  )
}

export default Photos
