import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useUser } from '../../context/UserContext'
import { authService } from '../../services/authService'
import { FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff, FiUserPlus } from 'react-icons/fi'
import './login.css'
import './register.css'

const roles = [
  { value: 'student', label: 'Student', icon: '🎓' },
  { value: 'owner', label: 'PG Owner', icon: '🏢' }
]

const Register = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { users, addUser } = useUser()

  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', role: 'student', college: ''
  })
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
    const validationErrors = authService.validateRegister(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    try {
      await new Promise(r => setTimeout(r, 800))
      const result = authService.mockRegister(form, users, addUser)

      if (result.success) {
        login(result.user, result.token)
        switch (result.user.role) {
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

  return (
    <div className="auth-page">
      <div className="auth-container" style={{ maxWidth: 520 }}>
        <div className="auth-card">
          <div className="auth-logo">
            <span className="auth-logo-icon">🏠</span>
            <span className="auth-logo-text">Finding<span>PG</span></span>
          </div>

          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join thousands of users finding their perfect PG</p>

          {apiError && (
            <div className="alert alert-error" style={{ marginBottom: '1rem' }}>
              {apiError}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Role Selection */}
            <div className="form-group">
              <label className="form-label">I am a...</label>
              <div className="register-role-grid">
                {roles.map(role => (
                  <button
                    key={role.value}
                    type="button"
                    className={`role-option ${form.role === role.value ? 'selected' : ''}`}
                    onClick={() => setForm(prev => ({ ...prev, role: role.value }))}
                  >
                    <span className="role-icon">{role.icon}</span>
                    <span className="role-label">{role.label}</span>
                  </button>
                ))}
              </div>
              {errors.role && <span className="form-error">{errors.role}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="input-group">
                <FiUser className="input-icon" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`form-input input-with-icon ${errors.name ? 'error' : ''}`}
                />
              </div>
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

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
                />
              </div>
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <div className="input-group">
                <FiPhone className="input-icon" />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className={`form-input input-with-icon ${errors.phone ? 'error' : ''}`}
                />
              </div>
              {errors.phone && <span className="form-error">{errors.phone}</span>}
            </div>

            {form.role === 'student' && (
              <div className="form-group">
                <label className="form-label">College Name</label>
                <input
                  type="text"
                  name="college"
                  value={form.college}
                  onChange={handleChange}
                  placeholder="Your college name (optional)"
                  className="form-input"
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-group">
                <FiLock className="input-icon" />
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  className={`form-input input-with-icon ${errors.password ? 'error' : ''}`}
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
                <><div className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} /> Creating account...</>
              ) : (
                <><FiUserPlus /> Create Account</>
              )}
            </button>
          </form>

          <p className="auth-footer">
            Already have an account?{' '}
            <Link to="/login" className="auth-link">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register