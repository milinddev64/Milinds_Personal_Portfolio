import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/button'
import { FaTimes, FaSearchMinus, FaSearchPlus, FaUndo, FaExternalLinkAlt, FaDownload } from 'react-icons/fa'

// ─── Types ───────────────────────────────────────────────────────────────────

export type MediaType = 'pdf' | 'image' | 'video'

export interface MediaViewerProps {
  isOpen: boolean
  onClose: () => void
  type: MediaType
  src: string
  title?: string
}

// ─── Image viewer with zoom / pan ────────────────────────────────────────────

const MIN_ZOOM = 0.5
const MAX_ZOOM = 4
const ZOOM_STEP = 0.25

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function ImageViewer({ src, title }: { src: string; title?: string }) {
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 })
  const pinchStart = useRef({ dist: 0, zoom: 1 })

  // Reset state whenever a new image is shown
  useEffect(() => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }, [src])

  const changeZoom = (delta: number) =>
    setZoom((z) => parseFloat(clamp(z + delta, MIN_ZOOM, MAX_ZOOM).toFixed(2)))

  const reset = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  // ── Scroll wheel zoom ──────────────────────────────────────────────────────
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    changeZoom(e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP)
  }

  // ── Mouse drag pan (only when zoomed in) ──────────────────────────────────
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return
    e.preventDefault()
    setIsDragging(true)
    dragStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    setPan({
      x: dragStart.current.panX + (e.clientX - dragStart.current.x),
      y: dragStart.current.panY + (e.clientY - dragStart.current.y),
    })
  }

  const stopDrag = () => setIsDragging(false)

  // ── Touch pinch-to-zoom ───────────────────────────────────────────────────
  const getTouchDist = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX
    const dy = touches[0].clientY - touches[1].clientY
    return Math.sqrt(dx * dx + dy * dy)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      pinchStart.current = { dist: getTouchDist(e.touches), zoom }
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length !== 2) return
    e.preventDefault()
    const ratio = getTouchDist(e.touches) / pinchStart.current.dist
    setZoom(parseFloat(clamp(pinchStart.current.zoom * ratio, MIN_ZOOM, MAX_ZOOM).toFixed(2)))
  }

  const cursor = isDragging ? 'cursor-grabbing' : zoom > 1 ? 'cursor-grab' : 'cursor-default'

  return (
    <div
      className={`flex-1 overflow-hidden flex items-center justify-center select-none relative ${cursor}`}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <img
        src={src}
        alt={title ?? 'Image'}
        draggable={false}
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: 'center center',
          transition: isDragging ? 'none' : 'transform 0.15s ease',
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      />

      {/* Zoom toolbar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-black/70 rounded-full px-3 py-1.5 backdrop-blur-sm pointer-events-auto">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-white hover:text-white hover:bg-white/20 rounded-full"
          onClick={() => changeZoom(-ZOOM_STEP)}
          disabled={zoom <= MIN_ZOOM}
        >
          <FaSearchMinus className="h-3.5 w-3.5" />
        </Button>
        <span className="text-white text-xs w-11 text-center tabular-nums">
          {Math.round(zoom * 100)}%
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-white hover:text-white hover:bg-white/20 rounded-full"
          onClick={() => changeZoom(ZOOM_STEP)}
          disabled={zoom >= MAX_ZOOM}
        >
          <FaSearchPlus className="h-3.5 w-3.5" />
        </Button>
        <div className="w-px h-4 bg-white/30 mx-1" />
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-white hover:text-white hover:bg-white/20 rounded-full"
          onClick={reset}
          title="Reset zoom & pan"
        >
          <FaUndo className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
}

// ─── Main viewer ─────────────────────────────────────────────────────────────

export default function MediaViewer({ isOpen, onClose, type, src, title }: MediaViewerProps) {
  useEffect(() => {
    if (!isOpen) return

    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = prev
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Dialog sizing varies by media type
  const dialogSize =
    type === 'pdf'
      ? 'w-[95vw] max-w-5xl h-[92vh]'
      : type === 'video'
        ? 'w-[95vw] max-w-4xl max-h-[90vh]'
        : 'w-[95vw] max-w-5xl max-h-[92vh]'

  return createPortal(
    // Backdrop — click outside the dialog to close
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title ?? 'Media viewer'}
    >
      {/* Dialog box — stop propagation so clicks inside don't close */}
      <div
        className={`relative flex flex-col bg-background rounded-2xl shadow-2xl overflow-hidden ${dialogSize}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header bar ─────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-4 py-3 border-b shrink-0 bg-muted/40">
          <p className="text-sm font-medium text-foreground truncate pr-4">
            {title ?? ''}
          </p>

          <div className="flex items-center gap-1 shrink-0">
            {/* PDF-specific action buttons */}
            {type === 'pdf' && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-xs"
                  onClick={() => window.open(src, '_blank', 'noopener,noreferrer')}
                  title="Open in new tab"
                >
                  <FaExternalLinkAlt className="h-3 w-3" />
                  Open
                </Button>
                <a href={src} download>
                  <Button variant="ghost" size="sm" className="gap-1.5 text-xs" title="Download">
                    <FaDownload className="h-3 w-3" />
                    Download
                  </Button>
                </a>
              </>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={onClose}
              aria-label="Close viewer"
            >
              <FaTimes className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* ── Content ────────────────────────────────────────────────── */}
        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
          {type === 'pdf' && (
            // <object> has better cross-browser inline-PDF support than <iframe>
            <object
              data={src}
              type="application/pdf"
              className="w-full h-full border-none"
              aria-label={title ?? 'PDF document'}
            >
              {/* Fallback when the browser cannot render the PDF inline */}
              <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center">
                <p className="text-muted-foreground text-sm">
                  Your browser cannot display this PDF inline.
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="default"
                    onClick={() => window.open(src, '_blank', 'noopener,noreferrer')}
                  >
                    <FaExternalLinkAlt className="mr-2 h-3.5 w-3.5" />
                    Open in new tab
                  </Button>
                  <a href={src} download>
                    <Button variant="outline">
                      <FaDownload className="mr-2 h-3.5 w-3.5" />
                      Download PDF
                    </Button>
                  </a>
                </div>
              </div>
            </object>
          )}

          {type === 'image' && <ImageViewer src={src} title={title} />}

          {type === 'video' && (
            <div className="w-full h-full flex items-center justify-center p-4 bg-black">
              <video
                key={src}
                controls
                autoPlay
                className="max-w-full max-h-full rounded-lg"
              >
                <source src={src} />
                Your browser does not support video playback.
              </video>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}
