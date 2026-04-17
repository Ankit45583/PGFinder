import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import { useAuth } from '../../context/AuthContext'
import { usePG } from '../../context/PGContext'
import { formatCurrency, formatDate } from '../../utils/helpers'
import { FiPlus, FiTrash2, FiEye, FiMapPin, FiEdit2 } from 'react-icons/fi'
import { MdOutlineBed } from 'react-icons/md'
import { FaHome } from 'react-icons/fa'
import './MyListings.css'

const MyListings = () => {
  const { user } = useAuth()
  const { getOwnerPGs, deletePG } = usePG()
  const [deleteId, setDeleteId] = useState(null)

  const myPGs = getOwnerPGs(user?.id)

  const approvedCount = myPGs.filter(pg => pg.status === 'approved').length
  const pendingCount = myPGs.filter(pg => pg.status === 'pending').length
  const rejectedCount = myPGs.filter(pg => pg.status === 'rejected').length

  return (
    <>
      <Navbar />
      <div className="listings-page">
        <div className="listings-container">

          {/* Header */}
          <div className="listings-header">
            <div className="listings-header-info">
              <h1 className="listings-title">
                <span className="listings-title-icon">📋</span>
                My Listings
              </h1>
              <p className="listings-subtitle">
                Manage all your PG accommodations in one place
              </p>
              {myPGs.length > 0 && (
                <div className="listings-count-badge">
                  <span className="dot"></span>
                  {myPGs.length} listing{myPGs.length !== 1 ? 's' : ''} total
                </div>
              )}
            </div>
            <Link to="/owner/add-pg" className="add-pg-btn">
              <FiPlus size={18} /> Add New PG
            </Link>
          </div>

          {/* Stats */}
          {myPGs.length > 0 && (
            <div className="listings-stats">
              <div className="stat-card-mini">
                <div className="stat-number">{myPGs.length}</div>
                <div className="stat-label">Total</div>
              </div>
              <div className="stat-card-mini active">
                <div className="stat-number">{approvedCount}</div>
                <div className="stat-label">Active</div>
              </div>
              <div className="stat-card-mini pending">
                <div className="stat-number">{pendingCount}</div>
                <div className="stat-label">Pending</div>
              </div>
              <div className="stat-card-mini rejected">
                <div className="stat-number">{rejectedCount}</div>
                <div className="stat-label">Rejected</div>
              </div>
            </div>
          )}

          {/* Listings */}
          {myPGs.length === 0 ? (
            <div className="listings-empty">
              <div className="empty-icon-container">🏠</div>
              <h3 className="empty-title">No Listings Yet</h3>
              <p className="empty-description">
                Start by adding your first PG accommodation. It only takes a few minutes!
              </p>
              <Link to="/owner/add-pg" className="add-pg-btn">
                <FiPlus size={18} /> Add Your First PG
              </Link>
            </div>
          ) : (
            <div className="listings-grid">
              {myPGs.map((pg, index) => (
                <div key={pg.id} className="listing-card" style={{ animationDelay: `${0.1 + index * 0.08}s` }}>

                  {/* Image */}
                  {pg.images?.[0] ? (
                    <div className="listing-image-wrapper">
                      <img
                        src={pg.images[0]}
                        alt={pg.name}
                        className="listing-image"
                        onError={(e) => {
                          e.target.parentElement.style.display = 'none'
                        }}
                      />
                    </div>
                  ) : (
                    <div className="listing-image-placeholder">
                      <FaHome />
                    </div>
                  )}

                  {/* Content */}
                  <div className="listing-content">
                    <div className="listing-content-header">
                      <h3 className="listing-name">{pg.name}</h3>
                      <span className={`status-badge ${pg.status}`}>
                        {pg.status}
                      </span>
                    </div>

                    <div className="listing-meta">
                      <span className="listing-meta-item">
                        <FiMapPin size={13} /> {pg.location}
                      </span>
                      <span className="listing-meta-item">
                        <MdOutlineBed size={14} /> {pg.totalRooms} rooms
                      </span>
                      <span className="listing-rent">
                        {formatCurrency(pg.rent)}
                        <span className="listing-rent-period">/mo</span>
                      </span>
                    </div>

                    {pg.status === 'rejected' && pg.rejectionReason && (
                      <div className="rejection-banner">
                        <span className="rejection-icon">⚠️</span>
                        <span>{pg.rejectionReason}</span>
                      </div>
                    )}

                    <div className="listing-date">
                      Added {formatDate(pg.createdAt)}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="listing-actions">
                    <Link
                      to={`/pg/${pg.id}`}
                      className="action-btn action-btn-view"
                    >
                      <FiEye size={14} /> View
                    </Link>
                    <button
                      className="action-btn action-btn-delete"
                      onClick={() => setDeleteId(pg.id)}
                    >
                      <FiTrash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {deleteId && (
            <div className="delete-modal-overlay" onClick={() => setDeleteId(null)}>
              <div className="delete-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-delete-icon">🗑️</div>
                <h3 className="modal-delete-title">Delete Listing?</h3>
                <p className="modal-delete-text">
                  This action is permanent and cannot be undone. All data associated with this listing will be removed.
                </p>
                <div className="modal-delete-actions">
                  <button
                    className="modal-btn modal-btn-cancel"
                    onClick={() => setDeleteId(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="modal-btn modal-btn-confirm"
                    onClick={() => {
                      deletePG(deleteId)
                      setDeleteId(null)
                    }}
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default MyListings