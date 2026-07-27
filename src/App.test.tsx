import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

const cards = () => screen.getAllByRole('article')

describe('App', () => {
  it('renders every listing on first load', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: 'House Hunting' })).toBeInTheDocument()
    expect(cards()).toHaveLength(6)
    expect(screen.getByRole('status')).toHaveTextContent('6 homes found')
  })

  it('narrows results with the search box', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByRole('searchbox', { name: /search/i }), 'loft')
    expect(cards()).toHaveLength(1)
    expect(screen.getByText('Downtown Loft with Skyline Views')).toBeInTheDocument()
  })

  it('combines the city and max price filters', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.selectOptions(screen.getByRole('combobox', { name: /city/i }), 'Portland')
    await user.selectOptions(screen.getByRole('combobox', { name: /max price/i }), '300000')
    expect(cards()).toHaveLength(1)
    expect(screen.getByRole('status')).toHaveTextContent('1 home found in Portland')
  })

  it('shows an empty state when nothing matches', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByRole('searchbox', { name: /search/i }), 'castle')
    expect(screen.getByText(/no homes match these filters yet/i)).toBeInTheDocument()
  })

  it('saves a listing and filters down to saved homes only', async () => {
    const user = userEvent.setup()
    render(<App />)
    const saveButtons = screen.getAllByRole('button', { name: 'Save' })
    await user.click(saveButtons[0])
    expect(screen.getByRole('button', { name: 'Saved' })).toHaveAttribute('aria-pressed', 'true')

    await user.click(screen.getByRole('checkbox', { name: /saved only/i }))
    expect(cards()).toHaveLength(1)

    await user.click(screen.getByRole('button', { name: 'Saved' }))
    expect(screen.getByText(/no homes match these filters yet/i)).toBeInTheDocument()
  })

  it('restores all listings after resetting the filters', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.selectOptions(screen.getByRole('combobox', { name: /min bedrooms/i }), '4')
    expect(cards()).toHaveLength(2)
    await user.click(screen.getByRole('button', { name: /reset filters/i }))
    expect(cards()).toHaveLength(6)
  })
})
