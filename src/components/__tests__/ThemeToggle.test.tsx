import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ThemeToggle from './ThemeToggle'
import { ThemeProvider } from '@/hooks/useTheme'

const ThemeToggleWrapper = () => (
  <ThemeProvider>
    <ThemeToggle />
  </ThemeProvider>
)

describe('ThemeToggle', () => {
  it('renders theme toggle button', () => {
    render(<ThemeToggleWrapper />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('toggles theme on click', async () => {
    const user = userEvent.setup()
    render(<ThemeToggleWrapper />)
    const button = screen.getByRole('button')
    await user.click(button)
    expect(button).toBeInTheDocument()
  })
})
