import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiMapPin, FiStar, FiHome, FiWifi, FiZap, FiEye } from 'react-icons/fi'
import { MdOutlineFastfood } from 'react-icons/md'
import { formatCurrency, getStatusColor, getStatusBg } from '../../utils/helpers'
import '../../styles/pg-card.css'

const facilityIcons = {
  'WiFi': <FiWifi />,
  'Meals': <MdOutlineFastfood />,
  'Power Backup': <FiZap />,
}

const PGCard = ({ pg, showStatus = false, actions = null }) => {
  const navigate = useNavigate()
  const [imgIndex, setImgIndex] = useState(0)

  const handleCardClick = () => {
    navigate(`/pg/${pg.id}`)
  }

  return (
    <div className="pg-card" onClick={handleCardClick}>
      {/* Image */}
      <div className="pg-card-image">
        <img
          src={pg.images?.[imgIndex] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800'}
          alt={pg.name}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800'
          }}
        />

        {pg.images?.length > 1 && (
          <div className="img-dots">
            {pg.images.map((_, i) => (
              <button
                key={i}
                className={`img-dot ${i === imgIndex ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setImgIndex(i) }}
              />
            ))}
          </div>
        )}

        <div className="pg-card-badges">
          <span className={`gender-badge ${pg.gender}`}>
            {pg.gender === 'male' ? '👨 Boys' : pg.gender === 'female' ? '👩 Girls' : '👥 Co-ed'}
          </span>
          {showStatus && (
            <span
              className="status-badge"
              style={{ color: getStatusColor(pg.status), background: getStatusBg(pg.status) }}
            >
              {pg.status}
            </span>
          )}
        </div>

        {pg.availableRooms > 0 && (
          <div className="available-tag">
            {pg.availableRooms} rooms available
          </div>
        )}
      </div>

      {/* Content */}
      <div className="pg-card-content">
        <div className="pg-card-header">
          <h3 className="pg-card-name">{pg.name}</h3>
          {pg.rating > 0 && (
            <div className="pg-rating">
              <FiStar className="star-icon" />
              <span>{pg.rating}</span>
            </div>
          )}
        </div>

        <div className="pg-card-location">
          <FiMapPin />
          <span>{pg.location}</span>
        </div>

        <div className="pg-card-facilities">
          {pg.facilities?.slice(0, 4).map(facility => (
            <span key={facility} className="facility-tag">
              {facilityIcons[facility] || <FiHome />}
              {facility}
            </span>
          ))}
          {pg.facilities?.length > 4 && (
            <span className="facility-tag more">+{pg.facilities.length - 4}</span>
          )}
        </div>

        <div className="pg-card-footer">
          <div className="pg-rent">
            <span className="rent-amount">{formatCurrency(pg.rent)}</span>
            <span className="rent-period">/month</span>
          </div>

          <button
            className="view-btn"
            onClick={(e) => { e.stopPropagation(); handleCardClick() }}
          >
            <FiEye />
            View Details
          </button>
        </div>

        {actions && (
          <div className="pg-card-actions" onClick={e => e.stopPropagation()}>
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}

export default PGCard