import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import { usePG } from '../../context/PGContext'
import { FiSearch, FiArrowRight, FiShield, FiStar, FiHome, FiMapPin, FiCheckCircle, FiUsers } from 'react-icons/fi'
import './home.css'

const features = [
  { icon: '🔐', title: 'Verified Listings', desc: 'Every PG is manually verified by our admin team before being listed on the platform.' },
  { icon: '💸', title: 'Zero Brokerage', desc: 'No middlemen. Connect directly with owners and save thousands on brokerage fees.' },
  { icon: '⭐', title: 'Genuine Reviews', desc: 'Read honest reviews from real tenants who have actually stayed in the PG.' },
  { icon: '⚡', title: 'Instant Connect', desc: 'Contact PG owners directly and schedule visits without any delay or third-party.' },
  { icon: '🔍', title: 'Smart Filters', desc: 'Filter by rent, gender preference, amenities, and distance from college or office.' },
  { icon: '🛡️', title: 'Safe & Trusted', desc: 'Background-checked listings so you never have to worry about fraudulent PGs.' }
]

const steps = [
  { num: '01', icon: '🔍', title: 'Search Location', desc: 'Enter your city, college name, or area to discover nearby PGs instantly.' },
  { num: '02', icon: '🎯', title: 'Filter & Compare', desc: 'Use smart filters for rent range, amenities, gender preference, and more.' },
  { num: '03', icon: '📞', title: 'Contact Owner', desc: 'Directly call or message the PG owner — no brokerage, no middlemen.' },
  { num: '04', icon: '🏠', title: 'Move In', desc: 'Visit the PG, finalize your agreement, and settle into your new home.' }
]

const cities = [
  { name: 'Delhi', emoji: '🏛️' },
  { name: 'Mumbai', emoji: '🌊' },
  { name: 'Bangalore', emoji: '🌿' },
  { name: 'Pune', emoji: '📚' },
  { name: 'Hyderabad', emoji: '💎' },
  { name: 'Chennai', emoji: '🌴' },
]

const testimonials = [
  {
    name: 'Ananya S.',
    role: 'Engineering Student, Delhi',
    text: 'Found my PG near college in under 10 minutes. The owner was super responsive and the listing was exactly as shown.',
    rating: 5,
    avatar: '👩‍💻'
  },
  {
    name: 'Rahul M.',
    role: 'IT Professional, Bangalore',
    text: 'Shifted cities for a job and was worried about PG hunting. PGFinder saved me so much time and the zero brokerage is a game changer.',
    rating: 5,
    avatar: '👨‍💼'
  },
  {
    name: 'Priya K.',
    role: 'MBA Student, Pune',
    text: 'Verified listings gave me confidence. I knew what I was getting before I even visited. Highly recommend for girls looking for safe PGs.',
    rating: 5,
    avatar: '👩‍🎓'
  }
]

const Home = () => {
  const navigate = useNavigate()
  const { getVerifiedPGs } = usePG()
  const [search, setSearch] = useState('')
  const verifiedPGs = getVerifiedPGs()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/pg-list?search=${encodeURIComponent(search)}`)
  }

  return (
    <>
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="home-hero">
        <div className="home-hero-bg-orb orb-1" />
        <div className="home-hero-bg-orb orb-2" />
        <div className="home-hero-bg-orb orb-3" />

        <div className="home-hero-inner">
          

          <h1 className="home-hero-title">
            Your Next Home
            <span className="home-gradient-text"> Away From Home</span>
          </h1>

          <p className="home-hero-desc">
            Discover safe, verified, and affordable PG accommodations near
            your college or workplace — zero brokerage, real reviews, instant connect.
          </p>

          <form className="home-search-bar" onSubmit={handleSearch}>
            <FiMapPin className="home-search-pin" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by city, area, college or PG name..."
              className="home-search-input"
            />
            <button type="submit" className="home-search-btn">
              <FiSearch size={16} /> Search PGs
            </button>
          </form>

          <div className="home-city-chips">
            {cities.map(city => (
              <span
                key={city.name}
                className="home-city-chip"
                onClick={() => navigate(`/pg-list?search=${city.name}`)}
              >
                {city.emoji} {city.name}
              </span>
            ))}
          </div>

          <div className="home-hero-stats">
            {[
              { val: `${verifiedPGs.length || '500'}+`, label: 'Verified PGs', icon: '🏠' },
              { val: '15+', label: 'Cities Covered', icon: '📍' },
              { val: '5K+', label: 'Happy Residents', icon: '😊' },
              { val: '4.8★', label: 'Avg Rating', icon: '⭐' }
            ].map((s, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className="home-stat-divider" />}
                <div className="home-stat-item">
                  <span className="home-stat-val">{s.val}</span>
                  <span className="home-stat-lbl">{s.label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Hero visual */}
        <div className="home-hero-visual">
          <div className="home-hero-img-card">
            <img
              src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=700&h=500&fit=crop"
              alt="PG Room"
              className="home-hero-main-img"
            />
            <div className="home-hero-img-badge">
              <FiShield size={11} /> Verified Listing
            </div>
          </div>

          <div className="home-hero-mini-grid">
            <img
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=250&h=180&fit=crop"
              alt="Living Space"
              className="home-mini-img"
            />
            <img
              src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=250&h=180&fit=crop"
              alt="PG Interior"
              className="home-mini-img"
            />
          </div>

         

          
        </div>
      </section>

     

      {/* ===== FEATURES ===== */}
      <section className="home-features">
        <div className="home-section-head">
          <h2>Everything You Need, <span className="home-gradient-text">All in One Place</span></h2>
          <p>We've made finding a PG as simple and stress-free as possible</p>
        </div>
        <div className="home-features-grid">
          {features.map((f, i) => (
            <div key={i} className="home-feature-card">
              <div className="home-feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="home-steps">
        <div className="home-section-head">
          <h2>How It <span className="home-gradient-text">Works</span></h2>
          <p>From search to move-in — 4 easy steps, zero hassle</p>
        </div>
        <div className="home-steps-grid">
          {steps.map((s, i) => (
            <div key={i} className="home-step-card">
              <div className="home-step-num">{s.num}</div>
              <div className="home-step-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              {i < steps.length - 1 && <div className="home-step-arrow">→</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="home-testimonials">
        <div className="home-section-head">
          <h2>Loved by <span className="home-gradient-text">Thousands</span></h2>
          <p>Don't just take our word for it — hear from our happy residents</p>
        </div>
        <div className="home-testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="home-testimonial-card">
              <div className="home-testimonial-stars">
                {'★'.repeat(t.rating)}
              </div>
              <p className="home-testimonial-text">"{t.text}"</p>
              <div className="home-testimonial-author">
                <span className="home-testimonial-avatar">{t.avatar}</span>
                <div>
                  <strong>{t.name}</strong>
                  <small>{t.role}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="home-cta">
        <div className="home-cta-inner">
          <div className="home-cta-glow" />
          <h2>Ready to Find Your <span className="home-gradient-text">Perfect PG?</span></h2>
          <p>Join 5,000+ students and professionals who found their ideal home through PGFinder.</p>
          <div className="home-cta-btns">
            <Link to="/pg-list" className="home-cta-btn primary">
              <FiSearch size={16} /> Browse All PGs
            </Link>
            <Link to="/register" className="home-cta-btn secondary">
              <FiHome size={16} /> List Your PG <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Home