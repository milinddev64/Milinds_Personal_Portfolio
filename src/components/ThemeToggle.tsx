import { FaSun, FaMoon } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/useTheme'
import { useTranslation } from 'react-i18next'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslation()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? t('theme.switchToDark') : t('theme.switchToLight')}
    >
      {theme === 'light' ? (
        <FaMoon className="h-5 w-5" />
      ) : (
        <FaSun className="h-5 w-5" />
      )}
    </Button>
  )
}
