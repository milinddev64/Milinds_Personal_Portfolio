import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface InfoModalProps {
  isOpen: boolean
  onClose: () => void
  icon?: React.ReactNode
  iconClassName?: string
  title: string
  message: string
  buttonLabel?: string
}

export default function InfoModal({
  isOpen,
  onClose,
  icon,
  iconClassName,
  title,
  message,
  buttonLabel = 'OK',
}: InfoModalProps) {
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

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-modal-overlay-in"
      onClick={onClose}
    >
      <Card
        className="max-w-md w-full mx-4 animate-modal-content-in"
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent className="p-8 text-center space-y-4">
          {icon && (
            <div className={`flex justify-center ${iconClassName}`}>
              {icon}
            </div>
          )}
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-muted-foreground">{message}</p>
          <Button className="w-full mt-2" onClick={onClose}>
            {buttonLabel}
          </Button>
        </CardContent>
      </Card>
    </div>,
    document.body
  )
}
