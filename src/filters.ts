import type { Listing } from './types'

export type Filters = {
  query: string
  city: string
  maxPrice: number
  minBedrooms: number
}

export const ALL_CITIES = 'All cities'

export const defaultFilters: Filters = {
  query: '',
  city: ALL_CITIES,
  maxPrice: Number.POSITIVE_INFINITY,
  minBedrooms: 0,
}

export function citiesOf(listings: Listing[]): string[] {
  return [ALL_CITIES, ...[...new Set(listings.map((l) => l.city))].sort()]
}

export function filterListings(listings: Listing[], filters: Filters): Listing[] {
  const query = filters.query.trim().toLowerCase()
  return listings.filter((listing) => {
    if (query && !`${listing.title} ${listing.city}`.toLowerCase().includes(query)) {
      return false
    }
    if (filters.city !== ALL_CITIES && listing.city !== filters.city) return false
    if (listing.price > filters.maxPrice) return false
    if (listing.bedrooms < filters.minBedrooms) return false
    return true
  })
}

export function formatPrice(price: number): string {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
}
