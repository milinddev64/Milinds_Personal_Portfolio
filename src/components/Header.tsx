import { useState } from 'react'
import { Link as ScrollLink } from 'react-scroll'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaBars, FaTimes, FaArrowLeft } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import ThemeToggle from '@/components/ThemeToggle'
import LanguageSelector from '@/components/LanguageSelector'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()

  const isHome = location.pathname === '/'

  const navItems = [
    { nameKey: 'nav.home', to: 'hero' },
    { nameKey: 'nav.about', to: 'about' },
    { nameKey: 'nav.experience', to: 'experience' },
    { nameKey: 'nav.projects', to: 'projects' },
    { nameKey: 'nav.photos', to: 'photos' },
    { nameKey: 'nav.contact', to: 'contact' },
  ]

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <nav className="container mx-auto px-4 py-4" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          {isHome ? (
            <ScrollLink
              to="hero"
              smooth={true}
              duration={500}
              className="text-2xl font-bold cursor-pointer hover:text-primary transition-colors"
            >
              {t('nav.portfolio')}
            </ScrollLink>
          ) : (
            <button
              onClick={() => navigate('/')}
              className="text-2xl font-bold cursor-pointer hover:text-primary transition-colors"
            >
              {t('nav.portfolio')}
            </button>
          )}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isHome ? (
              <>
                {navItems.map((item) => (
                  <ScrollLink
                    key={item.to}
                    to={item.to}
                    smooth={true}
                    duration={500}
                    offset={-80}
                    className="cursor-pointer hover:text-primary transition-colors"
                    activeClass="text-primary font-semibold"
                    spy={true}
                  >
                    {t(item.nameKey)}
                  </ScrollLink>
                ))}
              </>
            ) : (
              <Button
                variant="ghost"
                className="flex items-center gap-2"
                onClick={() => navigate('/')}
              >
                <FaArrowLeft />
                {t('gallery.backToHome')}
              </Button>
            )}
            <LanguageSelector />
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSelector />
            <ThemeToggle />
            {isHome && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </Button>
            )}
            {!isHome && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
              >
                <FaArrowLeft size={20} />
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isHome && isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <ScrollLink
                  key={item.to}
                  to={item.to}
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className="cursor-pointer hover:text-primary transition-colors"
                  activeClass="text-primary font-semibold"
                  spy={true}
                  onClick={toggleMenu}
                >
                  {t(item.nameKey)}
                </ScrollLink>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
