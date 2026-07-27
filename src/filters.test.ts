import { describe, expect, it } from 'vitest'
import { listings } from './data/listings'
import { ALL_CITIES, citiesOf, defaultFilters, filterListings, formatPrice } from './filters'

describe('citiesOf', () => {
  it('lists unique cities alphabetically behind the all-cities option', () => {
    expect(citiesOf(listings)).toEqual([ALL_CITIES, 'Austin', 'Chicago', 'Portland', 'Raleigh'])
  })
})

describe('filterListings', () => {
  it('returns every listing with the default filters', () => {
    expect(filterListings(listings, defaultFilters)).toHaveLength(listings.length)
  })

  it('matches the query against title and city case-insensitively', () => {
    expect(filterListings(listings, { ...defaultFilters, query: 'LOFT' })).toHaveLength(1)
    expect(filterListings(listings, { ...defaultFilters, query: 'portland' })).toHaveLength(2)
  })

  it('filters by city, max price and minimum bedrooms together', () => {
    const result = filterListings(listings, {
      ...defaultFilters,
      city: 'Chicago',
      maxPrice: 600000,
      minBedrooms: 3,
    })
    expect(result.map((l) => l.id)).toEqual(['l6'])
  })

  it('returns nothing when the filters exclude everything', () => {
    expect(
      filterListings(listings, { ...defaultFilters, maxPrice: 100000, minBedrooms: 5 }),
    ).toEqual([])
  })
})

describe('formatPrice', () => {
  it('renders whole-dollar USD amounts', () => {
    expect(formatPrice(465000)).toBe('$465,000')
  })
})
