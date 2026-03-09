import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { socialLinks } from '@/data/portfolio'
import type { ContactFormData } from '@/types/index'
import { useTranslation } from 'react-i18next'
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'
import InfoModal from '@/components/InfoModal'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

const Contact = () => {
  const { t } = useTranslation()
  const emailLink = socialLinks.find((l) => l.icon === 'FaEnvelope')

  const [showThankYou, setShowThankYou] = useState(false)
  const [showError, setShowError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      // Fallback: if EmailJS is not configured, log and show success
      console.log('EmailJS not configured. Form data:', formData)
      setShowThankYou(true)
      setFormData({ name: '', email: '', message: '' })
      setIsSubmitting(false)
      return
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        publicKey
      )
      setShowThankYou(true)
      setFormData({ name: '', email: '', message: '' })
    } catch {
      setShowError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('contact.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>{t('contact.cardTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    {t('contact.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                    placeholder={t('contact.namePlaceholder')}
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    {t('contact.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                    placeholder={t('contact.emailPlaceholder')}
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    {t('contact.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    disabled={isSubmitting}
                    rows={5}
                    className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none disabled:opacity-50"
                    placeholder={t('contact.messagePlaceholder')}
                  />
                </div>

                {/* Submit Button */}
                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      {t('contact.send')}
                    </span>
                  ) : (
                    t('contact.send')
                  )}
                </Button>

                {/* Note */}
                <p className="text-sm text-muted-foreground text-center">
                  {t('contact.note')}{' '}
                  {emailLink && (
                    <a
                      href={emailLink.url}
                      className="text-primary hover:underline"
                    >
                      {emailLink.url.replace('mailto:', '')}
                    </a>
                  )}
                </p>
              </form>
            </CardContent>
          </Card>

          <InfoModal
            isOpen={showThankYou}
            onClose={() => setShowThankYou(false)}
            icon={<FaCheckCircle className="h-12 w-12" />}
            iconClassName="text-green-500"
            title={t('modal.thankYouTitle')}
            message={t('modal.thankYouMessage')}
            buttonLabel={t('modal.close')}
          />

          <InfoModal
            isOpen={showError}
            onClose={() => setShowError(false)}
            icon={<FaExclamationTriangle className="h-12 w-12" />}
            iconClassName="text-red-500"
            title="Error"
            message="Something went wrong while sending your message. Please try again or contact directly via email."
            buttonLabel={t('modal.close')}
          />
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
