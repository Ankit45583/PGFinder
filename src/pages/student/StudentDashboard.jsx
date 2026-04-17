import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import PGCard from '../../components/pg/PGCard'
import { useAuth } from '../../context/AuthContext'
import { usePG } from '../../context/PGContext'
import { getInitials } from '../../utils/helpers'
import { FiSearch, FiArrowRight } from 'react-icons/fi'
import './studentdashboard.css'

const StudentDashboard = () => {
  const { user } = useAuth()
  const { getVerifiedPGs } = usePG()

  const verifiedPGs = getVerifiedPGs()
  const topRated = [...verifiedPGs].sort((a, b) => b.rating - a.rating).slice(0, 6)
  const newest = [...verifiedPGs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6)

  const minRent = verifiedPGs.length > 0
    ? Math.min(...verifiedPGs.map(p => p.rent))
    : 0

  const stats = [
    { icon: '🏠', value: verifiedPGs.length, label: 'Verified PGs', color: '#818cf8' },
    { icon: '📍', value: '10+', label: 'Cities', color: '#f472b6' },
    { icon: '⭐', value: topRated[0]?.rating || '–', label: 'Top Rating', color: '#fbbf24' },
    { icon: '💰', value: `₹${minRent}+`, label: 'Starting From', color: '#34d399' }
  ]

  return (
    <>
      <Navbar />
      <div className="sd-page">

        {/* Welcome Banner */}
        <div className="sd-welcome">
          <div className="sd-welcome-left">
            <div className="sd-avatar">
              {getInitials(user?.name)}
            </div>
            <div className="sd-welcome-info">
              <h1 className="sd-welcome-title">
                Welcome back, {user?.name?.split(' ')[0]}!
                <span className="sd-wave">👋</span>
              </h1>
              <p className="sd-welcome-sub">
                {user?.college
                  ? `Student at ${user.college}`
                  : 'Ready to find your perfect PG?'
                }
              </p>
            </div>
          </div>
          <Link to="/pg-list" className="sd-browse-btn">
            <FiSearch size={18} />
            Browse All PGs
          </Link>
        </div>

        {/* Stats */}
        <div className="sd-stats">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="sd-stat-card"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div
                className="sd-stat-icon"
                style={{ background: `${stat.color}18`, boxShadow: `0 8px 20px ${stat.color}12` }}
              >
                {stat.icon}
              </div>
              <div className="sd-stat-info">
                <div className="sd-stat-value" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="sd-stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Top Rated Section */}
        {topRated.length > 0 && (
          <div className="sd-section">
            <div className="sd-section-header">
              <h2 className="sd-section-title">
                <span className="sd-section-icon">⭐</span>
                Top Rated PGs
              </h2>
              <Link to="/pg-list?sort=rating" className="sd-view-all">
                View All <FiArrowRight size={14} />
              </Link>
            </div>
            <div className="sd-pg-grid">
              {topRated.map((pg, index) => (
                <div
                  key={pg.id}
                  className="sd-card-wrapper"
                  style={{ animationDelay: `${index * 0.07}s` }}
                >
                  <PGCard pg={pg} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Newest Listings Section */}
        {newest.length > 0 && (
          <div className="sd-section">
            <div className="sd-section-header">
              <h2 className="sd-section-title">
                <span className="sd-section-icon">🆕</span>
                Newest Listings
              </h2>
              <Link to="/pg-list" className="sd-view-all">
                View All <FiArrowRight size={14} />
              </Link>
            </div>
            <div className="sd-pg-grid">
              {newest.map((pg, index) => (
                <div
                  key={pg.id}
                  className="sd-card-wrapper"
                  style={{ animationDelay: `${index * 0.07}s` }}
                >
                  <PGCard pg={pg} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No PGs */}
        {verifiedPGs.length === 0 && (
          <div className="sd-empty">
            <div className="sd-empty-icon">🏠</div>
            <h3 className="sd-empty-title">No PGs Available Yet</h3>
            <p className="sd-empty-text">
              New PG listings are being added regularly. Check back soon!
            </p>
          </div>
        )}
      </div>
    </>
  )
}

export default StudentDashboard