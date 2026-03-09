import { Link } from 'react-scroll'
import { socialLinks } from '@/data/portfolio'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
}

const navItems = [
  { nameKey: 'nav.home', to: 'hero' },
  { nameKey: 'nav.about', to: 'about', offset: -80 },
  { nameKey: 'nav.experience', to: 'experience', offset: -80 },
  { nameKey: 'nav.projects', to: 'projects', offset: -80 },
  { nameKey: 'nav.photos', to: 'photos', offset: -80 },
  { nameKey: 'nav.contact', to: 'contact', offset: -80 },
]

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { t } = useTranslation()

  return (
    <footer className="bg-primary/5 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-6">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon]

              return (
                <Button
                  key={link.name}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="hover:text-primary"
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                  >
                    {Icon && <Icon size={24} />}
                  </a>
                </Button>
              )
            })}
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                smooth={true}
                duration={500}
                offset={item.offset}
                className="cursor-pointer hover:text-primary transition-colors"
              >
                {t(item.nameKey)}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground">
            <p>
              {t('footer.copyright', { year: currentYear, name: t('data.personalInfo.name') })}
            </p>
            <p className="mt-2">
              {t('footer.builtWith')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
