import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import { usePG } from '../../context/PGContext'
import { useAuth } from '../../context/AuthContext'
import { pgService } from '../../services/pgService'
import { facilitiesList } from '../../data/pgData'
import { ROOM_TYPES } from '../../utils/constants'
import {
  FiChevronLeft, FiChevronRight, FiUpload, FiX, FiPlus,
  FiCheck, FiImage, FiLink
} from 'react-icons/fi'
import './addpg.css'
import '../../styles/global.css'

const steps = [
  { id: 1, label: 'Basic Info', icon: '📋' },
  { id: 2, label: 'Details', icon: '🏠' },
  { id: 3, label: 'Facilities', icon: '⚡' },
  { id: 4, label: 'Images', icon: '📸' },
  { id: 5, label: 'Review', icon: '✅' }
]

const defaultForm = {
  name: '', location: '', address: '', rent: '', deposit: '',
  gender: '', description: '', totalRooms: '', availableRooms: '',
  facilities: [], roomTypes: [], nearbyColleges: '', rules: '',
  images: [], ownerPhone: '', ownerEmail: ''
}

const AddPg = () => {
  const navigate = useNavigate()
  const { addPG } = usePG()
  const { user } = useAuth()

  const [currentStep, setCurrentStep] = useState(1)
  const [form, setForm] = useState({ ...defaultForm, ownerPhone: user?.phone || '', ownerEmail: user?.email || '' })
  const [errors, setErrors] = useState({})
  const [sliderIndex, setSliderIndex] = useState(0)
  const [urlInput, setUrlInput] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const fileInputRef = useRef()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const toggleFacility = (f) => {
    setForm(prev => ({
      ...prev,
      facilities: prev.facilities.includes(f)
        ? prev.facilities.filter(x => x !== f)
        : [...prev.facilities, f]
    }))
    if (errors.facilities) setErrors(prev => ({ ...prev, facilities: '' }))
  }

  const toggleRoomType = (rt) => {
    setForm(prev => ({
      ...prev,
      roomTypes: prev.roomTypes.includes(rt)
        ? prev.roomTypes.filter(x => x !== rt)
        : [...prev.roomTypes, rt]
    }))
  }

  // Image from URL
  const addImageUrl = () => {
    const url = urlInput.trim()
    if (!url) return
    if (form.images.includes(url)) return
    setForm(prev => ({ ...prev, images: [...prev.images, url] }))
    setUrlInput('')
    if (errors.images) setErrors(prev => ({ ...prev, images: '' }))
  }

  // Image from file
  const handleFileUpload = (files) => {
    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) return
      const reader = new FileReader()
      reader.onload = (e) => {
        setForm(prev => ({
          ...prev,
          images: [...prev.images, e.target.result]
        }))
        if (errors.images) setErrors(prev => ({ ...prev, images: '' }))
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (idx) => {
    setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }))
    if (sliderIndex >= form.images.length - 1) setSliderIndex(Math.max(0, sliderIndex - 1))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFileUpload(e.dataTransfer.files)
  }

  const validateStep = () => {
    const newErrors = {}
    switch (currentStep) {
      case 1:
        if (!form.name.trim() || form.name.length < 3) newErrors.name = 'PG name must be at least 3 characters'
        if (!form.location.trim()) newErrors.location = 'Location is required'
        if (!form.address.trim()) newErrors.address = 'Full address is required'
        if (!form.gender) newErrors.gender = 'Please select PG type'
        break
      case 2:
        if (!form.rent || Number(form.rent) < 1000) newErrors.rent = 'Rent must be at least ₹1000'
        if (!form.deposit || Number(form.deposit) < 0) newErrors.deposit = 'Deposit is required'
        if (!form.totalRooms || Number(form.totalRooms) < 1) newErrors.totalRooms = 'Total rooms required'
        if (!form.description.trim() || form.description.length < 20) newErrors.description = 'Description must be at least 20 characters'
        break
      case 3:
        if (form.facilities.length === 0) newErrors.facilities = 'Select at least one facility'
        break
      case 4:
        break
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep()) setCurrentStep(s => Math.min(s + 1, 5))
  }

  const prevStep = () => setCurrentStep(s => Math.max(s - 1, 1))

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      await new Promise(r => setTimeout(r, 1000))
      const pgData = {
        ...form,
        rent: Number(form.rent),
        deposit: Number(form.deposit),
        totalRooms: Number(form.totalRooms),
        availableRooms: Number(form.availableRooms || form.totalRooms),
        ownerId: user.id,
        ownerName: user.name,
        nearbyColleges: form.nearbyColleges
          ? form.nearbyColleges.split(',').map(c => c.trim()).filter(Boolean)
          : [],
        rules: form.rules
          ? form.rules.split('\n').map(r => r.trim()).filter(Boolean)
          : []
      }
      addPG(pgData)
      navigate('/owner/my-pgs')
    } catch {
      setErrors({ submit: 'Failed to add PG. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  // Slider controls
  const nextSlide = () => setSliderIndex(i => (i + 1) % form.images.length)
  const prevSlide = () => setSliderIndex(i => i === 0 ? form.images.length - 1 : i - 1)

  return (
    <>
      <Navbar />
      <div className="addpg-page">
        <div className="addpg-header">
          <h1 className="page-title">➕ Add New PG</h1>
          <p className="page-subtitle">Fill in the details to list your PG accommodation</p>
        </div>

        <div className="addpg-card">
          {/* Steps */}
          <div className="addpg-steps">
            {steps.map(step => (
              <div
                key={step.id}
                className={`addpg-step ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
              >
                <div className="step-num">
                  {currentStep > step.id ? <FiCheck size={11} /> : step.id}
                </div>
                <span>{step.icon} {step.label}</span>
              </div>
            ))}
          </div>

          <div className="addpg-body">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div>
                <h3 className="addpg-section-title">📋 Basic Information</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">PG Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Sunrise Boys PG"
                      className={`form-input ${errors.name ? 'error' : ''}`}
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Location / Area *</label>
                      <input
                        type="text"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="e.g. Koramangala, Bangalore"
                        className={`form-input ${errors.location ? 'error' : ''}`}
                      />
                      {errors.location && <span className="form-error">{errors.location}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">PG Type *</label>
                      <select
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        className={`form-select ${errors.gender ? 'error' : ''}`}
                      >
                        <option value="">Select Type</option>
                        <option value="male">👨 Boys Only</option>
                        <option value="female">👩 Girls Only</option>
                        <option value="both">👥 Co-ed / Both</option>
                      </select>
                      {errors.gender && <span className="form-error">{errors.gender}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Full Address *</label>
                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Building no., Street, Area, City - Pincode"
                      rows={2}
                      className={`form-textarea ${errors.address ? 'error' : ''}`}
                    />
                    {errors.address && <span className="form-error">{errors.address}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Nearby Colleges (comma separated)</label>
                    <input
                      type="text"
                      name="nearbyColleges"
                      value={form.nearbyColleges}
                      onChange={handleChange}
                      placeholder="IIT Delhi, Delhi University, Jamia Millia"
                      className="form-input"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Details */}
            {currentStep === 2 && (
              <div>
                <h3 className="addpg-section-title">🏠 Pricing & Room Details</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Monthly Rent (₹) *</label>
                      <input
                        type="number"
                        name="rent"
                        value={form.rent}
                        onChange={handleChange}
                        placeholder="e.g. 8000"
                        min="0"
                        className={`form-input ${errors.rent ? 'error' : ''}`}
                      />
                      {errors.rent && <span className="form-error">{errors.rent}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Security Deposit (₹) *</label>
                      <input
                        type="number"
                        name="deposit"
                        value={form.deposit}
                        onChange={handleChange}
                        placeholder="e.g. 24000"
                        min="0"
                        className={`form-input ${errors.deposit ? 'error' : ''}`}
                      />
                      {errors.deposit && <span className="form-error">{errors.deposit}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Total Rooms *</label>
                      <input
                        type="number"
                        name="totalRooms"
                        value={form.totalRooms}
                        onChange={handleChange}
                        placeholder="e.g. 20"
                        min="1"
                        className={`form-input ${errors.totalRooms ? 'error' : ''}`}
                      />
                      {errors.totalRooms && <span className="form-error">{errors.totalRooms}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Available Rooms</label>
                      <input
                        type="number"
                        name="availableRooms"
                        value={form.availableRooms}
                        onChange={handleChange}
                        placeholder="e.g. 5"
                        min="0"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Room Types</label>
                    <div className="room-types-selector">
                      {ROOM_TYPES.map(rt => (
                        <button
                          key={rt}
                          type="button"
                          className={`room-type-toggle ${form.roomTypes.includes(rt) ? 'selected' : ''}`}
                          onClick={() => toggleRoomType(rt)}
                        >
                          {rt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description *</label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Describe your PG in detail - location benefits, environment, food quality, security, etc."
                      rows={5}
                      className={`form-textarea ${errors.description ? 'error' : ''}`}
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {form.description.length} chars (min 20)
                    </span>
                    {errors.description && <span className="form-error">{errors.description}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">House Rules (one per line)</label>
                    <textarea
                      name="rules"
                      value={form.rules}
                      onChange={handleChange}
                      placeholder={"No smoking\nNo alcohol\nGuests till 9 PM"}
                      rows={4}
                      className="form-textarea"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Facilities */}
            {currentStep === 3 && (
              <div>
                <h3 className="addpg-section-title">⚡ Facilities & Amenities</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  Select all facilities available in your PG:
                </p>
                <div className="facilities-selector">
                  {facilitiesList.map(f => (
                    <button
                      key={f}
                      type="button"
                      className={`facility-toggle ${form.facilities.includes(f) ? 'selected' : ''}`}
                      onClick={() => toggleFacility(f)}
                    >
                      {form.facilities.includes(f) && <FiCheck size={11} />}
                      {f}
                    </button>
                  ))}
                </div>
                {errors.facilities && (
                  <span className="form-error" style={{ marginTop: '0.75rem', display: 'block' }}>
                    {errors.facilities}
                  </span>
                )}
                {form.facilities.length > 0 && (
                  <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', background: 'rgba(108,99,255,0.08)', borderRadius: 10, fontSize: '0.85rem', color: 'var(--primary-light)' }}>
                    ✅ Selected {form.facilities.length} facilities: {form.facilities.join(', ')}
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Images */}
            {currentStep === 4 && (
              <div>
                <h3 className="addpg-section-title">📸 PG Images</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  Add clear images of your PG. Good images improve verification chances!
                </p>

                {/* Upload Area */}
                <div
                  className={`image-upload-area ${dragOver ? 'drag-over' : ''}`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                >
                  <span className="upload-icon">📁</span>
                  <p className="upload-title">Drop images here or click to upload</p>
                  <p className="upload-subtitle">Supports JPG, PNG, WebP – Up to 10 images</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileUpload(e.target.files)}
                  />
                </div>

                {/* URL Input */}
                <div style={{ marginTop: '1rem' }}>
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <FiLink /> Add Image via URL
                  </label>
                  <div className="addpg-url-input-group">
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="form-input"
                      onKeyDown={(e) => e.key === 'Enter' && addImageUrl()}
                    />
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={addImageUrl}
                      disabled={!urlInput.trim()}
                    >
                      <FiPlus /> Add
                    </button>
                  </div>
                </div>

                {/* Image Count */}
                {form.images.length > 0 && (
                  <p className="img-count-badge">
                    <FiImage /> {form.images.length} image{form.images.length > 1 ? 's' : ''} added
                  </p>
                )}

                {/* Image Previews */}
                {form.images.length > 0 && (
                  <>
                    {/* Slider Preview */}
                    <div className="addpg-image-slider">
                      <div className="addpg-slider-main">
                        <img
                          src={form.images[sliderIndex]}
                          alt={`preview-${sliderIndex}`}
                          onError={(e) => { e.target.style.display = 'none' }}
                        />
                        {form.images.length > 1 && (
                          <>
                            <button className="addpg-slider-nav prev" onClick={prevSlide} type="button">
                              <FiChevronLeft />
                            </button>
                            <button className="addpg-slider-nav next" onClick={nextSlide} type="button">
                              <FiChevronRight />
                            </button>
                            <div className="addpg-slider-counter">{sliderIndex + 1} / {form.images.length}</div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Grid Thumbnails */}
                    <div className="image-previews">
                      {form.images.map((img, i) => (
                        <div key={i} className="image-preview-item" onClick={() => setSliderIndex(i)}
                          style={{ cursor: 'pointer', border: i === sliderIndex ? '2px solid var(--primary)' : '' }}>
                          <img src={img} alt={`img-${i}`}
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/130x98?text=Error' }} />
                          <button
                            className="image-remove-btn"
                            type="button"
                            onClick={(e) => { e.stopPropagation(); removeImage(i) }}
                          >
                            <FiX />
                          </button>
                          {i === 0 && <span className="image-primary-badge">Main</span>}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {form.images.length === 0 && (
                  <div style={{
                    textAlign: 'center', padding: '2rem', color: 'var(--text-muted)',
                    background: 'var(--bg-input)', borderRadius: 'var(--radius)', marginTop: '1rem'
                  }}>
                    <FiImage style={{ fontSize: '2rem', opacity: 0.4, marginBottom: '0.5rem', display: 'block', margin: '0 auto 0.5rem' }} />
                    <p style={{ fontSize: '0.875rem' }}>No images added yet. Add at least 1 image for better visibility.</p>
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Review */}
            {currentStep === 5 && (
              <div>
                <h3 className="addpg-section-title">✅ Review Your Listing</h3>

                {errors.submit && (
                  <div className="alert alert-error" style={{ marginBottom: '1rem' }}>
                    {errors.submit}
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Preview Card */}
                  <div className="card">
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                      {form.images[0] && (
                        <img src={form.images[0]} alt="main"
                          style={{ width: 120, height: 90, objectFit: 'cover', borderRadius: 10, border: '1px solid var(--border)' }}
                          onError={(e) => { e.target.style.display = 'none' }}
                        />
                      )}
                      <div>
                        <h3 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{form.name || '–'}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{form.location}</p>
                        <p style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1.1rem' }}>
                          ₹{Number(form.rent).toLocaleString('en-IN')}/month
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.85rem' }}>
                      {[
                        ['Type', form.gender === 'male' ? 'Boys Only' : form.gender === 'female' ? 'Girls Only' : 'Co-ed'],
                        ['Deposit', `₹${Number(form.deposit || 0).toLocaleString('en-IN')}`],
                        ['Total Rooms', form.totalRooms],
                        ['Available', form.availableRooms || form.totalRooms],
                        ['Facilities', `${form.facilities.length} selected`],
                        ['Images', `${form.images.length} added`]
                      ].map(([label, value]) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid var(--border)' }}>
                          <span style={{ color: 'var(--text-muted)' }}>{label}</span>
                          <span style={{ fontWeight: 600 }}>{value || '–'}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="alert alert-warning">
                    ⏳ After submission, your listing will be reviewed by our admin team before becoming visible to students.
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="addpg-nav-btns">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                <FiChevronLeft /> Previous
              </button>

              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Step {currentStep} of {steps.length}
              </span>

              {currentStep < 5 ? (
                <button type="button" className="btn btn-primary" onClick={nextStep}>
                  Next <FiChevronRight />
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  {submitting ? (
                    <><div className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} /> Submitting...</>
                  ) : (
                    <><FiCheck /> Submit for Review</>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddPg