import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ThemeProvider } from '@/hooks/useTheme'

const AppWrapper = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
)

describe('App', () => {
  it('renders without crashing', () => {
    render(<AppWrapper />)
    expect(document.querySelector('#root')).toBeTruthy()
  })

  it('renders header component', () => {
    render(<AppWrapper />)
    const header = document.querySelector('header')
    expect(header).toBeTruthy()
  })
})
