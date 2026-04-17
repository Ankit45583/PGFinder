import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import PGCard from '../../components/pg/PGCard'
import { usePG } from '../../context/PGContext'
import { filterPGs, sortPGs } from '../../utils/helpers'
import { facilitiesList } from '../../data/pgData'
import { FiSearch, FiFilter, FiX, FiSliders } from 'react-icons/fi'
import './pg-list.css'
import '../../styles/global.css'

const genderOptions = [
  { value: '', label: 'All Types' },
  { value: 'male', label: '👨 Boys Only' },
  { value: 'female', label: '👩 Girls Only' },
  { value: 'both', label: '👥 Co-ed' }
]

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'rent_low', label: 'Rent: Low to High' },
  { value: 'rent_high', label: 'Rent: High to Low' },
  { value: 'rating', label: 'Top Rated' }
]

const PGList = () => {
  const [searchParams] = useSearchParams()
  const { getVerifiedPGs } = usePG()

  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [gender, setGender] = useState('')
  const [minRent, setMinRent] = useState('')
  const [maxRent, setMaxRent] = useState('')
  const [selectedFacilities, setSelectedFacilities] = useState([])
  const [sortBy, setSortBy] = useState('newest')
  const [showFilters, setShowFilters] = useState(false)

  const verifiedPGs = getVerifiedPGs()

  const filters = { search, gender, minRent, maxRent, facilities: selectedFacilities }
  const filtered = filterPGs(verifiedPGs, filters)
  const sorted = sortPGs(filtered, sortBy)

  const toggleFacility = (f) => {
    setSelectedFacilities(prev =>
      prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]
    )
  }

  const clearFilters = () => {
    setSearch('')
    setGender('')
    setMinRent('')
    setMaxRent('')
    setSelectedFacilities([])
    setSortBy('newest')
  }

  const hasFilters = search || gender || minRent || maxRent || selectedFacilities.length > 0

  return (
    <>
      <Navbar />
      <div className="pg-list-page">
        {/* Filter Bar */}
        <div className="filter-bar">
          <div className="filter-bar-inner">
            <div className="filter-search">
              <FiSearch className="filter-search-icon" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search PGs by name or location..."
                className="filter-search-input"
              />
            </div>

            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="filter-select"
            >
              {genderOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            <button
              className={`filter-btn ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiSliders />
              Filters
              {hasFilters && <span className="badge" style={{ width: 18, height: 18, fontSize: '0.65rem' }}>!</span>}
            </button>

            <span className="results-count">{sorted.length} PGs found</span>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="filter-panel">
            <div className="filter-panel-inner">
              <div className="filter-group">
                <label className="filter-label">Rent Range (₹)</label>
                <div className="rent-inputs">
                  <input
                    type="number"
                    value={minRent}
                    onChange={(e) => setMinRent(e.target.value)}
                    placeholder="Min"
                    className="rent-input"
                  />
                  <span className="rent-separator">–</span>
                  <input
                    type="number"
                    value={maxRent}
                    onChange={(e) => setMaxRent(e.target.value)}
                    placeholder="Max"
                    className="rent-input"
                  />
                </div>
              </div>

              <div className="filter-group">
                <label className="filter-label">Facilities</label>
                <div className="facilities-chips">
                  {facilitiesList.map(f => (
                    <button
                      key={f}
                      className={`facility-chip-filter ${selectedFacilities.includes(f) ? 'selected' : ''}`}
                      onClick={() => toggleFacility(f)}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {hasFilters && (
                <button className="clear-filters-btn" onClick={clearFilters}>
                  <FiX /> Clear All
                </button>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="pg-list-content">
          <div className="list-toolbar">
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
              {sorted.length > 0 ? `${sorted.length} Verified PGs` : 'No PGs Found'}
            </h2>
            <div className="sort-group">
              <FiSliders />
              <span>Sort by:</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {sorted.length > 0 ? (
            <div className="pg-grid">
              {sorted.map(pg => <PGCard key={pg.id} pg={pg} />)}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <h3>No PGs Found</h3>
              <p>Try adjusting your filters or search in a different area.</p>
              {hasFilters && (
                <button className="btn btn-secondary" onClick={clearFilters}>
                  <FiX /> Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default PGList