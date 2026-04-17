export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount)
}

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const getInitials = (name) => {
  if (!name) return 'U'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

export const getStatusColor = (status) => {
  switch (status) {
    case 'verified': return '#48bb78'
    case 'pending': return '#ed8936'
    case 'rejected': return '#fc8181'
    default: return '#a0aec0'
  }
}

export const getStatusBg = (status) => {
  switch (status) {
    case 'verified': return 'rgba(72, 187, 120, 0.15)'
    case 'pending': return 'rgba(237, 137, 54, 0.15)'
    case 'rejected': return 'rgba(252, 129, 129, 0.15)'
    default: return 'rgba(160, 174, 192, 0.15)'
  }
}

export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const validatePhone = (phone) => {
  return /^[6-9]\d{9}$/.test(phone)
}

export const filterPGs = (pgs, filters) => {
  return pgs.filter(pg => {
    if (filters.search) {
      const search = filters.search.toLowerCase()
      if (
        !pg.name.toLowerCase().includes(search) &&
        !pg.location.toLowerCase().includes(search) &&
        !pg.description.toLowerCase().includes(search)
      ) return false
    }
    if (filters.minRent && pg.rent < Number(filters.minRent)) return false
    if (filters.maxRent && pg.rent > Number(filters.maxRent)) return false
    if (filters.gender && filters.gender !== 'all' && pg.gender !== filters.gender) return false
    if (filters.location && !pg.location.toLowerCase().includes(filters.location.toLowerCase())) return false
    if (filters.facilities && filters.facilities.length > 0) {
      const pgFacilities = pg.facilities.map(f => f.toLowerCase())
      const hasAll = filters.facilities.every(f => pgFacilities.includes(f.toLowerCase()))
      if (!hasAll) return false
    }
    return true
  })
}

export const sortPGs = (pgs, sortBy) => {
  const sorted = [...pgs]
  switch (sortBy) {
    case 'rent_low': return sorted.sort((a, b) => a.rent - b.rent)
    case 'rent_high': return sorted.sort((a, b) => b.rent - a.rent)
    case 'rating': return sorted.sort((a, b) => b.rating - a.rating)
    case 'oldest': return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    case 'newest':
    default: return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }
}