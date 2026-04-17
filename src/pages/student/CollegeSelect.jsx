import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import { colleges } from '../../data/pgData'
import { FiSearch, FiArrowRight } from 'react-icons/fi'
import '../../styles/global.css'

const CollegeSelect = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState('')

  const filtered = colleges.filter(c =>
    c.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = (college) => {
    setSelected(college)
    navigate(`/pg-list?college=${encodeURIComponent(college)}`)
  }

  return (
    <>
      <Navbar />
      <div className="page-container" style={{ maxWidth: 700 }}>
        <div className="page-header" style={{ textAlign: 'center' }}>
          <h1 className="page-title">🎓 Select Your College</h1>
          <p className="page-subtitle">Find PGs near your college</p>
        </div>

        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
          <FiSearch style={{
            position: 'absolute', left: '1rem', top: '50%',
            transform: 'translateY(-50%)', color: 'var(--text-muted)'
          }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your college..."
            className="form-input"
            style={{ paddingLeft: '2.8rem' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {filtered.map(college => (
            <button
              key={college}
              onClick={() => handleSelect(college)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem 1.25rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'var(--transition)',
                textAlign: 'left'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary)'
                e.currentTarget.style.background = 'rgba(108, 99, 255, 0.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.background = 'var(--bg-card)'
              }}
            >
              <span>{college}</span>
              <FiArrowRight style={{ color: 'var(--primary)' }} />
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default CollegeSelect