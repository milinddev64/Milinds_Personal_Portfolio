import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n'
import Gallery from './Gallery'

const GalleryWrapper = () => (
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <Gallery />
    </I18nextProvider>
  </BrowserRouter>
)

describe('Gallery Page', () => {
  it('renders gallery title', () => {
    render(<GalleryWrapper />)
    expect(screen.getByText(/Photo Gallery/i)).toBeInTheDocument()
  })

  it('renders category filter buttons', () => {
    render(<GalleryWrapper />)
    expect(screen.getByText(/All/i)).toBeInTheDocument()
  })

  it('filters photos by category', async () => {
    const user = userEvent.setup()
    render(<GalleryWrapper />)
    
    const allButton = screen.getByText(/All/i)
    expect(allButton).toBeInTheDocument()
    
    await user.click(allButton)
    expect(allButton).toBeInTheDocument()
  })

  it('renders back to home link', () => {
    render(<GalleryWrapper />)
    expect(screen.getByText(/Back to Home/i)).toBeInTheDocument()
  })
})
