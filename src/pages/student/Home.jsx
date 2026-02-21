import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./home.css";

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFeatureClick = (type) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/pgs?type=${type}`);
    }
  };

  return (
    <div className="container home">
      {/* HERO */}
      <section className="hero">
        <h1>
          Find <span>Verified PGs</span> <br /> Near Your College
        </h1>

        <p className="hero-text">
          No brokers. No fake listings.  
          Discover trusted PGs with transparent pricing and admin verification.
        </p>

        <div className="hero-actions">
          <NavLink to="/pgs" className="primary-btn">
            Browse PGs →
          </NavLink>

          <NavLink to="/register" className="secondary-btn">
            List Your PG
          </NavLink>
        </div>
      </section>

      {/* TRUST HIGHLIGHTS */}
      <section className="trust">
        <div className="trust-item">✅ Admin Verified PGs</div>
        <div className="trust-item">🚫 No Broker Listings</div>
        <div className="trust-item">💬 Direct Owner Communication</div>
      </section>

      {/* FEATURE CARDS */}
      <section className="features">
        <div className="feature-card">
          <h3>Verified Listings</h3>
          <p>
            Only PGs verified by admins are visible to students,
            ensuring safety and authenticity.
          </p>
          <NavLink to="/pgs" className="feature-btn">
            View PGs →
          </NavLink>
        </div>

        <div className="feature-card">
          <h3>Transparent Pricing</h3>
          <p>
            No hidden charges or brokerage fees.
            What you see is what you pay.
          </p>
          <NavLink to="/pgs" className="feature-btn">
            See Pricing →
          </NavLink>
        </div>

        <div className="feature-card">
          <h3>Direct Owner Contact</h3>
          <p>
            Contact PG owners directly after viewing PG details.
            No middlemen involved.
          </p>
          <NavLink to="/pgs" className="feature-btn">
            Browse PGs →
          </NavLink>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div>
          <h3>120+</h3>
          <p>Verified PGs</p>
        </div>
        <div>
          <h3>35+</h3>
          <p>Colleges Covered</p>
        </div>
        <div>
          <h3>500+</h3>
          <p>Students Helped</p>
        </div>
      </section>

      {/* OWNER CTA */}
      <section className="cta">
        <h2>Are You a PG Owner?</h2>
        <p>
          List your PG and reach thousands of students looking
          for trusted accommodation.
        </p>
         <br></br>
        <NavLink to="/register" className="primary-btn">
          Register as Owner
        </NavLink>
      </section>
    </div>
  );
};

export default Home;
