import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n'
import Home from './Home'

const HomeWrapper = () => (
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <Home />
    </I18nextProvider>
  </BrowserRouter>
)

describe('Home Page', () => {
  it('renders all main sections', () => {
    render(<HomeWrapper />)
    
    // Check if main sections are present
    expect(document.querySelector('#hero')).toBeTruthy()
    expect(document.querySelector('#about')).toBeTruthy()
    expect(document.querySelector('#experience')).toBeTruthy()
    expect(document.querySelector('#projects')).toBeTruthy()
    expect(document.querySelector('#photos')).toBeTruthy()
    expect(document.querySelector('#contact')).toBeTruthy()
  })

  it('renders hero section with name', () => {
    render(<HomeWrapper />)
    expect(screen.getByText(/Milind Murmu/i)).toBeInTheDocument()
  })

  it('renders about section title', () => {
    render(<HomeWrapper />)
    expect(screen.getByText(/About Me/i)).toBeInTheDocument()
  })

  it('renders experience section title', () => {
    render(<HomeWrapper />)
    expect(screen.getByText(/Work Experience/i)).toBeInTheDocument()
  })

  it('renders projects section title', () => {
    render(<HomeWrapper />)
    expect(screen.getByText(/Featured Projects/i)).toBeInTheDocument()
  })

  it('renders contact section title', () => {
    render(<HomeWrapper />)
    expect(screen.getByText(/Get In Touch/i)).toBeInTheDocument()
  })
})
