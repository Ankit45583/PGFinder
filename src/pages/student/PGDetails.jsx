import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import { usePG } from '../../context/PGContext'
import { useAuth } from '../../context/AuthContext'
import { formatCurrency, formatDate, getInitials } from '../../utils/helpers'
import {
  FiArrowLeft, FiMapPin, FiStar, FiPhone, FiMail,
  FiChevronLeft, FiChevronRight, FiHome, FiUsers
} from 'react-icons/fi'
import { MdVerified } from 'react-icons/md'
import '../../styles/details.css'
import '../../styles/global.css'

const PGDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { pgs } = usePG()
  const { user } = useAuth()

  const pg = pgs.find(p => p.id === id)
  const [currentImg, setCurrentImg] = useState(0)
  const [showContact, setShowContact] = useState(false)

  if (!pg) {
    return (
      <>
        <Navbar />
        <div className="details-page">
          <div className="empty-state">
            <div className="empty-state-icon">🏠</div>
            <h3>PG Not Found</h3>
            <p>The PG you're looking for doesn't exist or has been removed.</p>
            <button className="btn btn-primary" onClick={() => navigate('/pg-list')}>
              Browse PGs
            </button>
          </div>
        </div>
      </>
    )
  }

  const nextImg = () => setCurrentImg(i => (i + 1) % (pg.images?.length || 1))
  const prevImg = () => setCurrentImg(i => i === 0 ? (pg.images?.length || 1) - 1 : i - 1)

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} style={{ color: i < Math.floor(rating) ? '#f6c90e' : 'var(--border)' }}>★</span>
    ))
  }

  return (
    <>
      <Navbar />
      <div className="details-page">
        <button className="details-back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft /> Back to Listings
        </button>

        <div className="details-grid">
          {/* Left Column */}
          <div>
            {/* Image Slider */}
            <div className="details-slider">
              <div className="slider-main">
                <img
                  src={pg.images?.[currentImg] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800'}
                  alt={`${pg.name} - Image ${currentImg + 1}`}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800'
                  }}
                />

                {pg.images?.length > 1 && (
                  <>
                    <button className="slider-btn prev" onClick={prevImg}><FiChevronLeft /></button>
                    <button className="slider-btn next" onClick={nextImg}><FiChevronRight /></button>
                    <div className="slider-counter">{currentImg + 1} / {pg.images.length}</div>
                  </>
                )}
              </div>

              {pg.images?.length > 1 && (
                <div className="slider-thumbnails">
                  {pg.images.map((img, i) => (
                    <div
                      key={i}
                      className={`slider-thumbnail ${i === currentImg ? 'active' : ''}`}
                      onClick={() => setCurrentImg(i)}
                    >
                      <img src={img} alt={`thumb-${i}`}
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=200' }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="details-info">
              <div className="details-header">
                <h1 className="details-name">{pg.name}</h1>
                {pg.rating > 0 && (
                  <div className="details-rating">
                    <FiStar />
                    <span>{pg.rating}</span>
                  </div>
                )}
              </div>

              <div className="details-location">
                <FiMapPin />
                <span>{pg.address || pg.location}</span>
              </div>

              <div className="details-rent-row">
                <span className="details-rent">{formatCurrency(pg.rent)}</span>
                <span className="details-rent-label">/month</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginLeft: '0.5rem' }}>
                  · Deposit: {formatCurrency(pg.deposit)}
                </span>
              </div>

              <div className="details-meta-grid">
                <div className="meta-item">
                  <div className="meta-label">PG Type</div>
                  <div className="meta-value">
                    {pg.gender === 'male' ? '👨 Boys Only' : pg.gender === 'female' ? '👩 Girls Only' : '👥 Co-ed'}
                  </div>
                </div>
                <div className="meta-item">
                  <div className="meta-label">Room Types</div>
                  <div className="meta-value">{pg.roomTypes?.join(', ')}</div>
                </div>
                <div className="meta-item">
                  <div className="meta-label">Total Rooms</div>
                  <div className="meta-value">{pg.totalRooms}</div>
                </div>
                <div className="meta-item">
                  <div className="meta-label">Available</div>
                  <div className="meta-value" style={{ color: pg.availableRooms > 0 ? 'var(--success)' : 'var(--danger)' }}>
                    {pg.availableRooms > 0 ? `${pg.availableRooms} rooms` : 'Full'}
                  </div>
                </div>
              </div>

              <p className="details-description">{pg.description}</p>
            </div>

            {/* Facilities */}
            <div className="details-section">
              <h3 className="section-title">🏠 Facilities & Amenities</h3>
              <div className="facilities-grid">
                {pg.facilities?.map(f => (
                  <span key={f} className="facility-chip">{f}</span>
                ))}
              </div>
            </div>

            {/* Nearby Colleges */}
            {pg.nearbyColleges?.length > 0 && (
              <div className="details-section">
                <h3 className="section-title">🎓 Nearby Colleges</h3>
                <div className="facilities-grid">
                  {pg.nearbyColleges.map(college => (
                    <span key={college} className="facility-chip" style={{
                      background: 'rgba(67, 233, 123, 0.1)',
                      borderColor: 'rgba(67, 233, 123, 0.2)',
                      color: 'var(--accent)'
                    }}>
                      {college}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Rules */}
            {pg.rules?.length > 0 && (
              <div className="details-section">
                <h3 className="section-title">📋 House Rules</h3>
                <ul className="rules-list">
                  {pg.rules.map((rule, i) => (
                    <li key={i}>{rule}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Reviews */}
            {pg.reviews?.length > 0 && (
              <div className="details-section">
                <h3 className="section-title">⭐ Reviews ({pg.reviews.length})</h3>
                <div className="reviews-list">
                  {pg.reviews.map(review => (
                    <div key={review.id} className="review-item">
                      <div className="review-header">
                        <span className="reviewer-name">{review.user}</span>
                        <span className="review-stars">{renderStars(review.rating)}</span>
                      </div>
                      <p className="review-comment">{review.comment}</p>
                      <p className="review-date">{formatDate(review.date)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="details-sidebar">
            {/* Status */}
            {pg.status === 'verified' && (
              <div style={{
                background: 'rgba(72, 187, 120, 0.1)',
                border: '1px solid rgba(72, 187, 120, 0.3)',
                borderRadius: 'var(--radius)',
                padding: '0.85rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem',
                fontSize: '0.875rem',
                color: 'var(--success)'
              }}>
                <MdVerified style={{ fontSize: '1.1rem' }} />
                <span><strong>Verified Listing</strong> – Admin approved</span>
              </div>
            )}

            {/* Contact Card */}
            <div className="contact-card">
              <div className="owner-info">
                <div className="owner-avatar">{getInitials(pg.ownerName)}</div>
                <div>
                  <div className="owner-name">{pg.ownerName}</div>
                  <div className="owner-label">PG Owner</div>
                </div>
              </div>

              {!showContact ? (
                <button className="contact-btn primary" onClick={() => setShowContact(true)}>
                  <FiPhone /> Show Contact Details
                </button>
              ) : (
                <div>
                  <a href={`tel:${pg.ownerPhone}`} className="contact-btn primary">
                    <FiPhone /> {pg.ownerPhone}
                  </a>
                  <a href={`mailto:${pg.ownerEmail}`} className="contact-btn secondary"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', marginTop: '0.5rem', padding: '0.75rem 1rem', borderRadius: '10px', fontSize: '0.875rem', fontWeight: 600, background: 'rgba(67, 233, 123, 0.1)', color: 'var(--accent)', border: '1px solid rgba(67, 233, 123, 0.3)', textDecoration: 'none' }}>
                    <FiMail /> {pg.ownerEmail}
                  </a>
                </div>
              )}

              {!user && (
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.75rem' }}>
                  <a href="/login" style={{ color: 'var(--primary)' }}>Login</a> to contact the owner
                </p>
              )}
            </div>

            {/* Quick Info */}
            <div className="contact-card">
              <h4 style={{ fontWeight: 700, marginBottom: '0.85rem', fontSize: '0.95rem' }}>
                📊 Quick Info
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[
                  { label: 'Monthly Rent', value: formatCurrency(pg.rent) },
                  { label: 'Security Deposit', value: formatCurrency(pg.deposit) },
                  { label: 'Room Types', value: pg.roomTypes?.join(', ') },
                  { label: 'Available Rooms', value: `${pg.availableRooms} / ${pg.totalRooms}` },
                  { label: 'Listed On', value: formatDate(pg.createdAt) }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{item.label}</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PGDetails