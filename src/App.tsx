import { useMemo, useState } from 'react'
import './App.css'
import { ListingCard } from './components/ListingCard'
import { listings as allListings } from './data/listings'
import { ALL_CITIES, citiesOf, defaultFilters, filterListings } from './filters'

const PRICE_CAPS = [
  { label: 'Any price', value: Number.POSITIVE_INFINITY },
  { label: 'Up to $300k', value: 300000 },
  { label: 'Up to $500k', value: 500000 },
  { label: 'Up to $750k', value: 750000 },
]

const BEDROOM_MINIMUMS = [0, 1, 2, 3, 4]

export default function App() {
  const [filters, setFilters] = useState(defaultFilters)
  const [savedIds, setSavedIds] = useState<string[]>([])
  const [savedOnly, setSavedOnly] = useState(false)

  const cities = useMemo(() => citiesOf(allListings), [])

  const visible = useMemo(() => {
    const matches = filterListings(allListings, filters)
    return savedOnly ? matches.filter((l) => savedIds.includes(l.id)) : matches
  }, [filters, savedOnly, savedIds])

  const toggleSave = (id: string) =>
    setSavedIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]))

  return (
    <div className="app">
      <header>
        <h1>House Hunting</h1>
        <p className="tagline">Browse listings, filter by what matters, and save your favorites.</p>
      </header>

      <section className="controls" aria-label="Filters">
        <label>
          Search
          <input
            type="search"
            placeholder="Title or city"
            value={filters.query}
            onChange={(e) => setFilters({ ...filters, query: e.target.value })}
          />
        </label>

        <label>
          City
          <select
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>

        <label>
          Max price
          <select
            value={String(filters.maxPrice)}
            onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
          >
            {PRICE_CAPS.map((cap) => (
              <option key={cap.label} value={String(cap.value)}>
                {cap.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Min bedrooms
          <select
            value={String(filters.minBedrooms)}
            onChange={(e) => setFilters({ ...filters, minBedrooms: Number(e.target.value) })}
          >
            {BEDROOM_MINIMUMS.map((n) => (
              <option key={n} value={String(n)}>
                {n === 0 ? 'Any' : `${n}+`}
              </option>
            ))}
          </select>
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={savedOnly}
            onChange={(e) => setSavedOnly(e.target.checked)}
          />
          Saved only ({savedIds.length})
        </label>

        <button
          type="button"
          className="reset"
          onClick={() => {
            setFilters(defaultFilters)
            setSavedOnly(false)
          }}
        >
          Reset filters
        </button>
      </section>

      <p className="results" role="status">
        {visible.length} {visible.length === 1 ? 'home' : 'homes'} found
        {filters.city !== ALL_CITIES ? ` in ${filters.city}` : ''}
      </p>

      {visible.length === 0 ? (
        <p className="empty">No homes match these filters yet. Try widening your search.</p>
      ) : (
        <div className="grid">
          {visible.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              isSaved={savedIds.includes(listing.id)}
              onToggleSave={toggleSave}
            />
          ))}
        </div>
      )}
    </div>
  )
}
