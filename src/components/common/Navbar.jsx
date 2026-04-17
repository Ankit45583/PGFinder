import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'
import { getInitials } from '../../utils/helpers'
import { FiHome, FiList, FiPlus, FiUsers, FiCheckSquare,
         FiLogOut, FiMenu, FiX, FiUser, FiGrid } from 'react-icons/fi'
import './Navbar.css'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/home')
    setMenuOpen(false)
  }

  const isActive = (path) => location.pathname === path

  const getNavLinks = () => {
    if (!user) return [
      { to: '/home', label: 'Home', icon: <FiHome /> },
      { to: '/pg-list', label: 'Browse PGs', icon: <FiList /> }
    ]

    switch (user.role) {
      case 'student': return [
        { to: '/student/dashboard', label: 'Dashboard', icon: <FiGrid /> },
        { to: '/pg-list', label: 'Browse PGs', icon: <FiList /> }
      ]
      case 'owner': return [
        { to: '/owner/dashboard', label: 'Dashboard', icon: <FiGrid /> },
        { to: '/owner/my-pgs', label: 'My PGs', icon: <FiList /> },
        { to: '/owner/add-pg', label: 'Add PG', icon: <FiPlus /> }
      ]
      case 'admin': return [
        { to: '/admin/dashboard', label: 'Dashboard', icon: <FiGrid /> },
        { to: '/admin/verify-pg', label: 'Verify PGs', icon: <FiCheckSquare /> },
        { to: '/admin/users', label: 'Users', icon: <FiUsers /> }
      ]
      default: return []
    }
  }

  const links = getNavLinks()

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🏠</span>
          <span className="brand-text">Finding<span>PG</span></span>
        </Link>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${isActive(link.to) ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}

          {user ? (
            <div className="nav-profile">
              <button
                className="profile-btn"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <div className="avatar">{getInitials(user.name)}</div>
                <span className="profile-name">{user.name.split(' ')[0]}</span>
              </button>

              {profileOpen && (
                <div className="profile-dropdown">
                  <div className="dropdown-header">
                    <div className="avatar lg">{getInitials(user.name)}</div>
                    <div>
                      <p className="dropdown-name">{user.name}</p>
                      <p className="dropdown-email">{user.email}</p>
                      <span className={`role-badge ${user.role}`}>{user.role}</span>
                    </div>
                  </div>
                  <hr className="dropdown-divider" />
                  <button className="dropdown-item logout" onClick={handleLogout}>
                    <FiLogOut />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="nav-auth">
              <Link to="/login" className="btn-login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="btn-register" onClick={() => setMenuOpen(false)}>
                Register
              </Link>
            </div>
          )}
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </nav>
  )
}

export default Navbar