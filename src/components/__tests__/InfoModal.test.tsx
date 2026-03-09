import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import InfoModal from './InfoModal'
import { FaCheckCircle } from 'react-icons/fa'

describe('InfoModal', () => {
  it('renders modal when isOpen is true', () => {
    render(
      <InfoModal
        isOpen={true}
        onClose={() => {}}
        icon={<FaCheckCircle />}
        title="Test Title"
        message="Test Message"
        buttonLabel="OK"
      />
    )
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Message')).toBeInTheDocument()
  })

  it('does not render modal when isOpen is false', () => {
    render(
      <InfoModal
        isOpen={false}
        onClose={() => {}}
        icon={<FaCheckCircle />}
        title="Test Title"
        message="Test Message"
        buttonLabel="OK"
      />
    )
    expect(screen.queryByText('Test Title')).not.toBeInTheDocument()
  })

  it('calls onClose when button is clicked', async () => {
    const handleClose = vi.fn()
    const user = userEvent.setup()
    render(
      <InfoModal
        isOpen={true}
        onClose={handleClose}
        icon={<FaCheckCircle />}
        title="Test Title"
        message="Test Message"
        buttonLabel="OK"
      />
    )
    await user.click(screen.getByText('OK'))
    expect(handleClose).toHaveBeenCalledTimes(1)
  })
})
