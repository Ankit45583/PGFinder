import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-left">
          <h3>FindMyPG</h3>
          <p>Find trusted PG accommodations easily.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/pgs">PGs</a>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Email: ankitmaurya4578@gmail.com</p>
          <p>Phone: +91 9082804989</p>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} FindMyPG. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;