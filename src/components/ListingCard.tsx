import { formatPrice } from '../filters'
import type { Listing } from '../types'

type Props = {
  listing: Listing
  isSaved: boolean
  onToggleSave: (id: string) => void
}

export function ListingCard({ listing, isSaved, onToggleSave }: Props) {
  return (
    <article className="card">
      <div className="card-media" role="img" aria-label={listing.imageAlt} />
      <div className="card-body">
        <h2>{listing.title}</h2>
        <p className="price">{formatPrice(listing.price)}</p>
        <p className="meta">
          {listing.city} · {listing.bedrooms} bd · {listing.bathrooms} ba ·{' '}
          {listing.sqft.toLocaleString('en-US')} sqft
        </p>
        <button
          type="button"
          className={isSaved ? 'save saved' : 'save'}
          aria-pressed={isSaved}
          onClick={() => onToggleSave(listing.id)}
        >
          {isSaved ? 'Saved' : 'Save'}
        </button>
      </div>
    </article>
  )
}
