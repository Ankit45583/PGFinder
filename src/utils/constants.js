export const ROLES = {
  STUDENT: 'student',
  OWNER: 'owner',
  ADMIN: 'admin'
}

export const PG_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected'
}

export const GENDER_OPTIONS = [
  { value: 'male', label: 'Boys Only' },
  { value: 'female', label: 'Girls Only' },
  { value: 'both', label: 'Co-ed / Both' }
]

export const ROOM_TYPES = ['Single', 'Double', 'Triple', 'Studio']

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'rent_low', label: 'Rent: Low to High' },
  { value: 'rent_high', label: 'Rent: High to Low' },
  { value: 'rating', label: 'Top Rated' }
]