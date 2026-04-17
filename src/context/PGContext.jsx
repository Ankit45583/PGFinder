import React, { createContext, useContext, useState, useEffect } from 'react'
import { pgData as initialData } from '../data/pgData'

 export const PGContext = createContext()

export const usePG = () => {
  const context = useContext(PGContext)
  if (!context) throw new Error('usePG must be used within PGProvider')
  return context
}

export const PGProvider = ({ children }) => {
  const [pgs, setPgs] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    search: '',
    minRent: '',
    maxRent: '',
    gender: '',
    facilities: [],
    location: ''
  })

  useEffect(() => {
    const saved = localStorage.getItem('pg_listings')
    if (saved) {
      setPgs(JSON.parse(saved))
    } else {
      setPgs(initialData)
      localStorage.setItem('pg_listings', JSON.stringify(initialData))
    }
  }, [])

  const savePgs = (newPgs) => {
    setPgs(newPgs)
    localStorage.setItem('pg_listings', JSON.stringify(newPgs))
  }

  const addPG = (pgData) => {
    const newPG = {
      ...pgData,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      rating: 0,
      reviews: []
    }
    const updated = [...pgs, newPG]
    savePgs(updated)
    return newPG
  }

  const updatePG = (id, data) => {
    const updated = pgs.map(pg => pg.id === id ? { ...pg, ...data } : pg)
    savePgs(updated)
  }

  const deletePG = (id) => {
    const updated = pgs.filter(pg => pg.id !== id)
    savePgs(updated)
  }

  const verifyPG = (id) => {
    updatePG(id, { status: 'verified' })
  }

  const rejectPG = (id, reason) => {
    updatePG(id, { status: 'rejected', rejectionReason: reason })
  }

  const getVerifiedPGs = () => pgs.filter(pg => pg.status === 'verified')
  const getPendingPGs = () => pgs.filter(pg => pg.status === 'pending')
  const getOwnerPGs = (ownerId) => pgs.filter(pg => pg.ownerId === ownerId)

  return (
    <PGContext.Provider value={{
      pgs, loading, filters, setFilters,
      addPG, updatePG, deletePG, verifyPG, rejectPG,
      getVerifiedPGs, getPendingPGs, getOwnerPGs
    }}>
      {children}
    </PGContext.Provider>
  )
}