import { Card, CardContent } from '@/components/ui/card'
import { skills } from '@/data/portfolio'
import {
  FaReact,
  FaJsSquare,
  FaNode,
  FaPython,
  FaGitAlt,
  FaDocker,
  FaAws,
} from 'react-icons/fa'
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
} from 'react-icons/si'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  FaReact,
  SiTypescript,
  FaJsSquare,
  SiNextdotjs,
  SiTailwindcss,
  FaNode,
  FaPython,
  SiPostgresql,
  SiMongodb,
  FaGitAlt,
  FaDocker,
  FaAws,
}

const About = () => {
  const { t } = useTranslation()

  const groupedSkills = {
    frontend: skills.filter((s) => s.category === 'frontend'),
    backend: skills.filter((s) => s.category === 'backend'),
    tools: skills.filter((s) => s.category === 'tools'),
  }

  const renderSkillGroup = (categorySkills: typeof skills) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categorySkills.map((skill) => {
        const Icon = iconMap[skill.icon]

        return (
          <Card
            key={skill.name}
            className="hover:shadow-lg transition-shadow"
          >
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center gap-3">
                {Icon && <Icon className="text-2xl text-primary" />}
                <span className="font-medium">{skill.name}</span>
              </div>
              {/* Proficiency Bar */}
              <div className="space-y-1">
                <div className="w-full bg-secondary/40 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-300"
                    role="progressbar"
                    aria-valuenow={skill.proficiency}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${skill.name} proficiency`}
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{skill.proficiency}%</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )

  return (
    <section id="about" className="py-20 bg-secondary/20">
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('about.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('about.basedIn', { location: t('data.personalInfo.location') })}{' '}
              {t('about.techIntro')}
            </p>
          </div>

          {/* Skills Grid */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">{t('about.frontend')}</h3>
              {renderSkillGroup(groupedSkills.frontend)}
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">{t('about.backend')}</h3>
              {renderSkillGroup(groupedSkills.backend)}
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">{t('about.tools')}</h3>
              {renderSkillGroup(groupedSkills.tools)}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
