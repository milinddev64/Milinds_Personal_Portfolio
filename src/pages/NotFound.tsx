import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="text-center space-y-6 px-4">
        <h1 className="text-8xl font-bold text-primary">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild size="lg">
          <Link to="/">{t('gallery.backToHome')}</Link>
        </Button>
      </div>
    </main>
  )
}
