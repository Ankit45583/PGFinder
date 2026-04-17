import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-logo-icon">🏠</span>
            <span className="footer-logo-text">PG<span>Finder</span></span>
          </div>
          <p className="footer-tagline">
            India's most trusted platform to discover safe, verified, and affordable PG accommodations.
          </p>
          <div className="footer-socials">
            <a href="#" aria-label="Instagram" className="footer-social-btn">📸</a>
            <a href="#" aria-label="Twitter" className="footer-social-btn">🐦</a>
            <a href="#" aria-label="LinkedIn" className="footer-social-btn">💼</a>
            <a href="#" aria-label="YouTube" className="footer-social-btn">▶️</a>
          </div>
        </div>

        <div className="footer-links-group">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/pg-list">Browse All PGs</Link></li>
            <li><Link to="/pg-list?search=Delhi">PGs in Delhi</Link></li>
            <li><Link to="/pg-list?search=Mumbai">PGs in Mumbai</Link></li>
            <li><Link to="/pg-list?search=Bangalore">PGs in Bangalore</Link></li>
            <li><Link to="/pg-list?search=Pune">PGs in Pune</Link></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h4>For Owners</h4>
          <ul>
            <li><Link to="/register">List Your PG</Link></li>
            <li><Link to="/login">Owner Login</Link></li>
            <li><Link to="/dashboard">Manage Listings</Link></li>
            <li><Link to="#">Pricing Plans</Link></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h4>Company</h4>
          <ul>
            <li><Link to="#">About Us</Link></li>
            <li><Link to="#">Contact</Link></li>
            <li><Link to="#">Privacy Policy</Link></li>
            <li><Link to="#">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} PGFinder. All rights reserved. Made with ❤️ for students across India.</p>
        <div className="footer-bottom-badges">
          <span>🔒 SSL Secured</span>
          <span>✅ Verified Listings</span>
          <span>🇮🇳 Made in India</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer