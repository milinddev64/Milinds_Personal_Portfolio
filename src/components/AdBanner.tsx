import { useEffect, useRef } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────

type AdFormat = 'vertical' | 'horizontal' | 'auto'

interface AdBannerProps {
  /** The ad unit slot ID from your Google AdSense dashboard */
  slot: string
  /** Display format — vertical (skyscraper), horizontal (banner), or auto */
  format?: AdFormat
  /** Additional Tailwind classes for the outer wrapper */
  className?: string
}

// Extend window to include adsbygoogle without full @types/google-publisher-tag dep
declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * AdBanner — wraps a Google AdSense <ins> ad unit.
 *
 * Renders nothing in development mode (import.meta.env.DEV) to prevent
 * AdSense "ad served outside approved domain" console errors.
 *
 * To activate:
 *  1. Set VITE_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX in .env.local
 *  2. Add the AdSense <script> tag in index.html <head>
 *  3. Deploy to your approved production domain
 */
export default function AdBanner({ slot, format = 'auto', className = '' }: AdBannerProps) {
  const insRef = useRef<HTMLModElement>(null)
  const pushed = useRef(false)

  const clientId = import.meta.env.VITE_ADSENSE_CLIENT_ID as string | undefined

  // Do not render in dev mode or if publisher ID is not configured
  if (import.meta.env.DEV || !clientId) {
    return null
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (pushed.current) return
    pushed.current = true
    try {
      window.adsbygoogle = window.adsbygoogle || []
      window.adsbygoogle.push({})
    } catch {
      // adsbygoogle not yet loaded — script tag in index.html may be missing
    }
  }, [])

  const minHeight =
    format === 'vertical' ? 'min-h-[600px]' : format === 'horizontal' ? 'min-h-[90px]' : 'min-h-[100px]'

  return (
    <div className={`w-full overflow-hidden ${minHeight} ${className}`}>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
