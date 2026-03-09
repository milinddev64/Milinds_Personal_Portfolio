import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LanguageSelector from './LanguageSelector'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n'

const LanguageSelectorWrapper = () => (
  <I18nextProvider i18n={i18n}>
    <LanguageSelector />
  </I18nextProvider>
)

describe('LanguageSelector', () => {
  it('renders language selector button', () => {
    render(<LanguageSelectorWrapper />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('opens dropdown on click', async () => {
    const user = userEvent.setup()
    render(<LanguageSelectorWrapper />)
    const button = screen.getByRole('button')
    await user.click(button)
    expect(screen.getByText('English')).toBeInTheDocument()
  })
})
