import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import { useAuth } from '../../context/AuthContext'
import { usePG } from '../../context/PGContext'
import PGCard from '../../components/pg/PGCard'
import { FiPlus, FiTrash2, FiFilter, FiAlertCircle } from 'react-icons/fi'
import './mypgs.css'

const statusFilters = [
  { key: 'all', label: 'All', icon: '📦' },
  { key: 'verified', label: 'Verified', icon: '✅' },
  { key: 'pending', label: 'Pending', icon: '⏳' },
  { key: 'rejected', label: 'Rejected', icon: '❌' }
]

const MyPGs = () => {
  const { user } = useAuth()
  const { getOwnerPGs, deletePG } = usePG()
  const [activeFilter, setActiveFilter] = useState('all')
  const [deleteId, setDeleteId] = useState(null)

  const myPGs = getOwnerPGs(user?.id)

  const filtered = activeFilter === 'all'
    ? myPGs
    : myPGs.filter(pg => pg.status === activeFilter)

  const counts = {
    all: myPGs.length,
    verified: myPGs.filter(p => p.status === 'verified').length,
    pending: myPGs.filter(p => p.status === 'pending').length,
    rejected: myPGs.filter(p => p.status === 'rejected').length
  }

  const handleDelete = (id) => {
    deletePG(id)
    setDeleteId(null)
  }

  return (
    <>
      <Navbar />
      <div className="mypgs-page">

        {/* Header */}
        <div className="mypgs-header">
          <div className="mypgs-header-left">
            <h1 className="mypgs-title">
              <span className="mypgs-title-icon">🏠</span>
              My PG Listings
            </h1>
            <p className="mypgs-subtitle">
              Manage, track and organize all your PG accommodations
            </p>
            <div className="mypgs-stats-row">
              <div className="mypgs-stat">
                <span className="mypgs-stat-num">{counts.all}</span>
                <span className="mypgs-stat-label">Total</span>
              </div>
              <div className="mypgs-stat verified">
                <span className="mypgs-stat-num">{counts.verified}</span>
                <span className="mypgs-stat-label">Live</span>
              </div>
              <div className="mypgs-stat pending">
                <span className="mypgs-stat-num">{counts.pending}</span>
                <span className="mypgs-stat-label">Pending</span>
              </div>
              <div className="mypgs-stat rejected">
                <span className="mypgs-stat-num">{counts.rejected}</span>
                <span className="mypgs-stat-label">Rejected</span>
              </div>
            </div>
          </div>
          <Link to="/owner/add-pg" className="mypgs-add-btn">
            <FiPlus size={18} />
            Add New PG
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="mypgs-filter-bar">
          <div className="mypgs-filter-label">
            <FiFilter size={14} /> Filter
          </div>
          <div className="mypgs-filter-row">
            {statusFilters.map(f => (
              <button
                key={f.key}
                className={`mypgs-tab ${activeFilter === f.key ? 'active' : ''}`}
                onClick={() => setActiveFilter(f.key)}
              >
                <span className="tab-icon">{f.icon}</span>
                {f.label}
                <span className="tab-count">{counts[f.key]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* PG Grid */}
        {filtered.length > 0 ? (
          <div className="mypgs-grid">
            {filtered.map((pg, index) => (
              <div
                key={pg.id}
                className="mypgs-card-wrapper"
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                <PGCard
                  pg={pg}
                  showStatus
                  actions={
                    <div className="mypgs-card-actions">
                      {pg.status === 'rejected' && pg.rejectionReason && (
                        <div className="rejection-reason">
                          <FiAlertCircle size={14} />
                          <span>{pg.rejectionReason || 'Not specified'}</span>
                        </div>
                      )}
                      <button
                        className="pg-action-btn delete"
                        onClick={() => setDeleteId(pg.id)}
                      >
                        <FiTrash2 size={14} />
                        Delete
                      </button>
                    </div>
                  }
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="mypgs-empty">
            <div className="mypgs-empty-icon">
              {activeFilter === 'all' ? '🏠' : activeFilter === 'verified' ? '✅' : activeFilter === 'pending' ? '⏳' : '❌'}
            </div>
            <h3 className="mypgs-empty-title">
              No {activeFilter !== 'all' ? activeFilter : ''} listings found
            </h3>
            <p className="mypgs-empty-text">
              {activeFilter === 'all'
                ? "You haven't added any PG listings yet. Start by adding your first property!"
                : `No ${activeFilter} listings at the moment. Check back later.`
              }
            </p>
            {activeFilter === 'all' && (
              <Link to="/owner/add-pg" className="mypgs-add-btn">
                <FiPlus size={18} />
                Add Your First PG
              </Link>
            )}
          </div>
        )}

        {/* Results Footer */}
        {filtered.length > 0 && (
          <div className="mypgs-footer">
            Showing {filtered.length} of {myPGs.length} listing{myPGs.length !== 1 ? 's' : ''}
            {activeFilter !== 'all' && (
              <button className="mypgs-clear-filter" onClick={() => setActiveFilter('all')}>
                Clear filter ✕
              </button>
            )}
          </div>
        )}

        {/* Delete Modal */}
        {deleteId && (
          <div className="mypgs-modal-overlay" onClick={() => setDeleteId(null)}>
            <div className="mypgs-modal" onClick={e => e.stopPropagation()}>
              <div className="mypgs-modal-icon">🗑️</div>
              <h3 className="mypgs-modal-title">Delete this listing?</h3>
              <p className="mypgs-modal-text">
                This action is permanent and cannot be undone. All data, images and tenant info will be removed.
              </p>
              <div className="mypgs-modal-actions">
                <button className="modal-btn cancel" onClick={() => setDeleteId(null)}>
                  Cancel
                </button>
                <button className="modal-btn confirm" onClick={() => handleDelete(deleteId)}>
                  <FiTrash2 size={15} />
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default MyPGs