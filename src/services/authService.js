import { validateEmail, validatePhone } from '../utils/helpers.js'

export const authService = {
  validateLogin: (email, password) => {
    const errors = {}
    if (!email) errors.email = 'Email is required'
    else if (!validateEmail(email)) errors.email = 'Invalid email format'
    if (!password) errors.password = 'Password is required'
    else if (password.length < 6) errors.password = 'Password must be at least 6 characters'
    return errors
  },

  validateRegister: (data) => {
    const errors = {}
    if (!data.name || data.name.trim().length < 2) errors.name = 'Name must be at least 2 characters'
    if (!data.email) errors.email = 'Email is required'
    else if (!validateEmail(data.email)) errors.email = 'Invalid email format'
    if (!data.phone) errors.phone = 'Phone number is required'
    else if (!validatePhone(data.phone)) errors.phone = 'Invalid phone number (10 digits starting with 6-9)'
    if (!data.password) errors.password = 'Password is required'
    else if (data.password.length < 6) errors.password = 'Password must be at least 6 characters'
    if (!data.role) errors.role = 'Please select a role'
    return errors
  },

  mockLogin: (email, password, users) => {
    const user = users.find(u => u.email === email && u.password === password)
    if (!user) return { success: false, message: 'Invalid email or password' }
    if (!user.isActive) return { success: false, message: 'Your account has been deactivated' }
    const token = `mock_token_${user.id}_${Date.now()}`
    const { password: _, ...safeUser } = user
    return { success: true, user: safeUser, token }
  },

  mockRegister: (data, users, addUser) => {
    const existing = users.find(u => u.email === data.email)
    if (existing) return { success: false, message: 'Email already registered' }
    const newUser = addUser(data)
    const token = `mock_token_${newUser.id}_${Date.now()}`
    const { password: _, ...safeUser } = newUser
    return { success: true, user: safeUser, token }
  }
}