import { useState } from 'react'
import { Link } from 'react-scroll'
import { Button } from '@/components/ui/button'
import { FaArrowDown, FaEye, FaDownload } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { profileImage } from '@/data/portfolio'
import { motion } from 'framer-motion'
import MediaViewer from '@/components/MediaViewer'

const RESUME_PATH = '/documents/resumes/Milind-Murmu.pdf'

const Hero = () => {
  const { t } = useTranslation()
  const [imgError, setImgError] = useState(false)
  const [isResumeOpen, setIsResumeOpen] = useState(false)

  const handleViewResume = () => setIsResumeOpen(true)

  const handleDownloadResume = () => {
    const link = document.createElement('a')
    link.href = RESUME_PATH
    link.download = 'Milind-Murmu.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10"
    >
      <div className="container mx-auto px-4 py-20">
        <motion.div
          className="max-w-5xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Left Text Content */}
          <div className="flex-1 text-center md:text-left space-y-6">
            {/* Greeting */}
            <p className="text-lg text-muted-foreground animate-fade-in">
              {t('hero.greeting')}
            </p>

            {/* Name */}
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {t('data.personalInfo.name')}
            </h1>

            {/* Title */}
            <h2 className="text-2xl md:text-4xl font-semibold text-foreground/90">
              {t('data.personalInfo.title')}
            </h2>

            {/* Bio */}
            <p className="text-lg text-muted-foreground max-w-2xl">
              {t('data.personalInfo.bio')}
            </p>

            {/* CTA Buttons */}
            <div className="grid grid-cols-2 sm:flex sm:flex-row sm:flex-wrap gap-4 justify-center md:justify-start mt-8">
              <Link to="projects" smooth={true} duration={500} offset={-80} className="col-span-1">
                <Button size="lg" className="w-full">
                  {t('hero.viewWork')}
                </Button>
              </Link>

              <Link to="contact" smooth={true} duration={500} offset={-80} className="col-span-1">
                <Button size="lg" variant="outline" className="w-full">
                  {t('hero.getInTouch')}
                </Button>
              </Link>

              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto col-span-1"
                onClick={handleViewResume}
              >
                <FaEye className="mr-2" />
                {t('hero.viewResume')}
              </Button>

              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto col-span-1"
                onClick={handleDownloadResume}
              >
                <FaDownload className="mr-2" />
                {t('hero.downloadResume')}
              </Button>
            </div>
          </div>

          {/* Right Profile Picture */}
          <div className="shrink-0">
            {!imgError ? (
              <img
                src={profileImage}
                alt={t('data.personalInfo.name')}
                className="w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full object-cover ring-4 ring-primary/30 shadow-[0_0_40px_8px_hsl(var(--primary)/0.45)]"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full bg-gradient-to-br from-primary to-primary/60 ring-4 ring-primary/30 shadow-[0_0_40px_8px_hsl(var(--primary)/0.45)] flex items-center justify-center">
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground">
                  {t('data.personalInfo.name')
                    .split(' ')
                    .map((w: string) => w[0])
                    .join('')
                    .slice(0, 2)}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Link to="about" smooth={true} duration={500} offset={-80}>
            <Button variant="ghost" size="icon" className="rounded-full">
              <FaArrowDown className="text-muted-foreground" />
            </Button>
          </Link>
        </div>
      </div>

      <MediaViewer
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        type="pdf"
        src={RESUME_PATH}
        title="Milind Murmu — Resume"
      />
    </section>
  )
}

export default Hero
