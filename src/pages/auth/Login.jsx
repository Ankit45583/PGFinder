import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useUser } from '../../context/UserContext'
import { authService } from '../../services/authService'
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn } from 'react-icons/fi'
import './login.css'

const demoUsers = [
  { role: 'admin', email: 'admin@findingpg.com', password: 'admin123' },
  { role: 'owner', email: 'owner@findingpg.com', password: 'owner123' },
  { role: 'student', email: 'student@findingpg.com', password: 'student123' }
]

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { users } = useUser()

  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    setApiError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = authService.validateLogin(form.email, form.password)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    try {
      await new Promise(r => setTimeout(r, 800))
      const result = authService.mockLogin(form.email, form.password, users)

      if (result.success) {
        login(result.user, result.token)
        switch (result.user.role) {
          case 'admin': navigate('/admin/dashboard'); break
          case 'owner': navigate('/owner/dashboard'); break
          case 'student': navigate('/student/dashboard'); break
          default: navigate('/home')
        }
      } else {
        setApiError(result.message)
      }
    } catch {
      setApiError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const fillDemo = (demo) => {
    setForm({ email: demo.email, password: demo.password })
    setErrors({})
    setApiError('')
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-logo">
            <span className="auth-logo-icon">🏠</span>
            <span className="auth-logo-text">Finding<span>PG</span></span>
          </div>

          <h1 className="auth-title">Welcome Back!</h1>
          <p className="auth-subtitle">Sign in to your account</p>

          {apiError && (
            <div className="alert alert-error" style={{ marginBottom: '1rem' }}>
              {apiError}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-group">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`form-input input-with-icon ${errors.email ? 'error' : ''}`}
                  autoComplete="email"
                />
              </div>
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-group">
                <FiLock className="input-icon" />
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`form-input input-with-icon ${errors.password ? 'error' : ''}`}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && <span className="form-error">{errors.password}</span>}
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? (
                <><div className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} /> Signing in...</>
              ) : (
                <><FiLogIn /> Sign In</>
              )}
            </button>
          </form>

          <p className="auth-footer">
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">Create Account</Link>
          </p>

          {/* Demo Credentials */}
          <div className="demo-credentials">
            <p className="demo-title">🎯 Demo Accounts – Click to fill</p>
            {demoUsers.map(demo => (
              <div key={demo.role} className="demo-item" onClick={() => fillDemo(demo)}>
                <span className={`demo-role ${demo.role}`}>{demo.role}</span>
                <span className="demo-creds">{demo.email}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login