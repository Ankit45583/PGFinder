import React, { createContext, useContext, useState, useEffect } from 'react'

 export const UserContext = createContext()

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUser must be used within UserProvider')
  return context
}

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('pg_users')
    if (saved) {
      setUsers(JSON.parse(saved))
    } else {
      const defaultUsers = [
        {
          id: 'admin-1',
          name: 'Admin User',
          email: 'admin@findingpg.com',
          password: 'admin123',
          role: 'admin',
          phone: '9999999999',
          createdAt: new Date().toISOString(),
          isActive: true
        },
        {
          id: 'owner-1',
          name: 'Rajesh Kumar',
          email: 'owner@findingpg.com',
          password: 'owner123',
          role: 'owner',
          phone: '8888888888',
          createdAt: new Date().toISOString(),
          isActive: true
        },
        {
          id: 'student-1',
          name: 'Amit Sharma',
          email: 'student@findingpg.com',
          password: 'student123',
          role: 'student',
          phone: '7777777777',
          college: 'IIT Delhi',
          createdAt: new Date().toISOString(),
          isActive: true
        }
      ]
      setUsers(defaultUsers)
      localStorage.setItem('pg_users', JSON.stringify(defaultUsers))
    }
  }, [])

  const saveUsers = (newUsers) => {
    setUsers(newUsers)
    localStorage.setItem('pg_users', JSON.stringify(newUsers))
  }

  const addUser = (userData) => {
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      isActive: true
    }
    const updated = [...users, newUser]
    saveUsers(updated)
    return newUser
  }

  const updateUser = (id, data) => {
    const updated = users.map(u => u.id === id ? { ...u, ...data } : u)
    saveUsers(updated)
  }

  const deleteUser = (id) => {
    const updated = users.filter(u => u.id !== id)
    saveUsers(updated)
  }

  const findUserByEmail = (email) => users.find(u => u.email === email)

  const toggleUserStatus = (id) => {
    const updated = users.map(u =>
      u.id === id ? { ...u, isActive: !u.isActive } : u
    )
    saveUsers(updated)
  }

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser, findUserByEmail, toggleUserStatus }}>
      {children}
    </UserContext.Provider>
  )
}