import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './context/AuthContext'
import { PGProvider } from './context/PGContext'
import { UserProvider } from './context/UserContext'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <PGProvider>
            <AppRoutes />
          </PGProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App