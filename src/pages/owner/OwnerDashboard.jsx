import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import PGCard from '../../components/pg/PGCard'
import { useAuth } from '../../context/AuthContext'
import { usePG } from '../../context/PGContext'
import { getStatusColor, getStatusBg } from '../../utils/helpers'
import './owner.css'
import '../../styles/global.css'

const OwnerDashboard = () => {
  const { user } = useAuth()
  const { getOwnerPGs } = usePG()

  const myPGs = getOwnerPGs(user?.id)
  const verified = myPGs.filter(p => p.status === 'verified')
  const pending = myPGs.filter(p => p.status === 'pending')
  const rejected = myPGs.filter(p => p.status === 'rejected')

  const quickActions = [
    { icon: '➕', title: 'Add New PG', desc: 'List a new PG accommodation', to: '/owner/add-pg', color: 'var(--primary)' },
    { icon: '🏠', title: 'My PGs', desc: 'View and manage all listings', to: '/owner/my-pgs', color: 'var(--accent)' },
    { icon: '📋', title: 'All Listings', desc: 'Detailed listing management', to: '/owner/listings', color: 'var(--secondary)' },
    { icon: '📞', title: 'Contact Admin', desc: 'Get help or report an issue', to: '/owner/contact', color: 'var(--warning)' }
  ]

  return (
    <>
      <Navbar />
      <div className="owner-dashboard">
        {/* Welcome */}
        <div className="owner-welcome">
          <h1 className="owner-welcome-title">Welcome, {user?.name}! 👋</h1>
          <p className="owner-welcome-sub">Manage your PG listings and track their verification status.</p>
        </div>

        {/* Stats */}
        <div className="owner-stats">
          {[
            { icon: '🏠', value: myPGs.length, label: 'Total Listings', color: 'var(--primary)' },
            { icon: '✅', value: verified.length, label: 'Verified', color: 'var(--success)' },
            { icon: '⏳', value: pending.length, label: 'Pending', color: 'var(--warning)' },
            { icon: '❌', value: rejected.length, label: 'Rejected', color: 'var(--danger)' }
          ].map((stat, i) => (
            <div key={i} className="stat-card">
              <div className="stat-icon" style={{ background: `${stat.color}20`, fontSize: '1.5rem' }}>
                {stat.icon}
              </div>
              <div className="stat-info">
                <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Quick Actions</h2>
        <div className="quick-actions">
          {quickActions.map((action, i) => (
            <Link key={i} to={action.to} className="quick-action-card">
              <div className="quick-action-icon" style={{ background: `${action.color}15`, fontSize: '1.8rem' }}>
                {action.icon}
              </div>
              <div className="quick-action-title">{action.title}</div>
              <div className="quick-action-desc">{action.desc}</div>
            </Link>
          ))}
        </div>

        {/* Recent PGs */}
        {myPGs.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>My Recent Listings</h2>
              <Link to="/owner/my-pgs" style={{ color: 'var(--primary)', fontSize: '0.875rem', fontWeight: 600 }}>
                View All
              </Link>
            </div>
            <div className="pg-grid">
              {myPGs.slice(0, 3).map(pg => (
                <PGCard key={pg.id} pg={pg} showStatus />
              ))}
            </div>
          </div>
        )}

        {myPGs.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">🏠</div>
            <h3>No Listings Yet</h3>
            <p>Start by adding your first PG accommodation.</p>
            <Link to="/owner/add-pg" className="btn btn-primary">
              ➕ Add Your First PG
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export default OwnerDashboard