import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { projects } from '@/data/portfolio'
import { useTranslation } from 'react-i18next'
import { FaGithub, FaExternalLinkAlt, FaHardHat } from 'react-icons/fa'
import InfoModal from '@/components/InfoModal'
import { motion } from 'framer-motion'

const Projects = () => {
  const { t } = useTranslation()
  const [showConstruction, setShowConstruction] = useState(false)

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t('projects.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('projects.subtitle')}
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => {
              const projData = t(`data.projects.${project.id}`, { returnObjects: true }) as {
                title: string
                description: string
              }

              return (
                <Card
                  key={project.id}
                  className="overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  {/* Project Image */}
                  <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={projData.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <p className="text-4xl font-bold text-muted-foreground/20">
                          {projData.title}
                        </p>
                      </div>
                    )}
                  </div>

                  <CardHeader>
                    <CardTitle>{projData.title}</CardTitle>
                    <CardDescription>{projData.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="gap-2">
                    {project.demoUrl && (
                      <Button
                        variant="default"
                        onClick={() => setShowConstruction(true)}
                        className="flex items-center gap-2"
                      >
                        <FaExternalLinkAlt />
                        {t('projects.liveDemo')}
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button
                        variant="outline"
                        onClick={() => setShowConstruction(true)}
                        className="flex items-center gap-2"
                      >
                        <FaGithub />
                        {t('projects.github')}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              )
            })}
          </div>

          <InfoModal
            isOpen={showConstruction}
            onClose={() => setShowConstruction(false)}
            icon={<FaHardHat className="h-12 w-12" />}
            iconClassName="text-yellow-500"
            title={t('modal.constructionTitle')}
            message={t('modal.constructionMessage')}
            buttonLabel={t('modal.close')}
          />
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
