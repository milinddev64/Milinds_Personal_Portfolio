import { useState, useRef, useEffect } from 'react'
import { FaGlobe } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'hi', label: 'HI' },
  { code: 'fr', label: 'FR' },
  { code: 'de', label: 'DE' },
]

export default function LanguageSelector() {
  const { i18n, t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentLang =
    languages.find((l) => l.code === i18n.language) ||
    languages.find((l) => i18n.language.startsWith(l.code)) ||
    languages[0]

  return (
    <div className="relative" ref={ref}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('language.label')}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <FaGlobe className="h-5 w-5" />
      </Button>

      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 bg-card border rounded-md shadow-lg py-1 min-w-[140px] z-50"
          role="listbox"
          aria-label={t('language.label')}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              role="option"
              aria-selected={currentLang.code === lang.code}
              onClick={() => {
                i18n.changeLanguage(lang.code)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors ${
                currentLang.code === lang.code ? 'bg-accent/50 font-medium' : ''
              }`}
            >
              <span className="font-mono mr-2">{lang.label}</span>
              {t(`language.${lang.code}`)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
