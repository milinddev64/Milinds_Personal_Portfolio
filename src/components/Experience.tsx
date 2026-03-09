import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { experiences } from '@/data/portfolio'
import { FaBriefcase, FaCalendarAlt } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const Experience = () => {
  const { t } = useTranslation()

  return (
    <section id="experience" className="py-20 bg-secondary/20">
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('experience.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('experience.subtitle')}
            </p>
          </div>

          {/* Experience Cards */}
          <div className="space-y-6">
            {experiences.map((exp) => {
              const expData = t(`data.experiences.${exp.id}`, { returnObjects: true }) as {
                company: string
                jobTitle: string
                startDate: string
                description: string
                highlightPoints: string[]
                roles?: { title: string; startDate: string; endDate?: string; description: string; highlightPoints?: string[] }[]
              }

              const roles = expData.roles
              const hasRoles = roles && roles.length > 1

              const overallStart = hasRoles
                ? roles[roles.length - 1].startDate
                : expData.startDate

              const overallEnd = hasRoles
                ? roles[0].endDate || t('experience.present')
                : exp.endDate || t('experience.present')

              return (
                <Card key={exp.id} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <FaBriefcase className="text-primary" />
                          {expData.company}
                        </CardTitle>
                        {!hasRoles && (
                          <CardDescription className="text-lg font-semibold mt-1">
                            {expData.jobTitle}
                          </CardDescription>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <FaCalendarAlt />
                        <span>{overallStart} - {overallEnd}</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Promotion Timeline with per-role details */}
                    {hasRoles && (
                      <div className="ml-1">
                        {roles.map((role, index) => {
                          const isCurrent = index === 0
                          const isLast = index === roles.length - 1

                          return (
                            <div key={index} className="flex gap-3">
                              {/* Timeline track */}
                              <div className="flex flex-col items-center">
                                <div
                                  className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${
                                    isCurrent ? 'bg-primary' : 'bg-muted-foreground/40'
                                  }`}
                                />
                                {!isLast && (
                                  <div className="w-0.5 flex-1 bg-primary/20" />
                                )}
                              </div>

                              {/* Role details */}
                              <div className={isLast ? 'pb-0' : 'pb-6'}>
                                <p className={`text-sm ${isCurrent ? 'font-semibold text-foreground' : 'font-medium text-muted-foreground'}`}>
                                  {role.title}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  {role.startDate} - {role.endDate || t('experience.present')}
                                </p>
                                {role.description && (
                                  <p className="text-sm text-muted-foreground mt-2">
                                    {role.description}
                                  </p>
                                )}
                                {role.highlightPoints && role.highlightPoints.length > 0 && (
                                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-2">
                                    {role.highlightPoints.map((point, i) => (
                                      <li key={i}>{point}</li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {/* Fallback: shared description for experiences without roles */}
                    {!hasRoles && (
                      <>
                        <p className="text-muted-foreground">{expData.description}</p>
                        {expData.highlightPoints && expData.highlightPoints.length > 0 && (
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {expData.highlightPoints.map((point, index) => (
                              <li key={index}>{point}</li>
                            ))}
                          </ul>
                        )}
                      </>
                    )}

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
