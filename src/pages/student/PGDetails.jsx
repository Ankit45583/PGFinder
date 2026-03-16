import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { PGContext } from "../../context/PGContext";

import Slider from "react-slick";  // import slick slider
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const PGDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pgs } = useContext(PGContext);

  const pg = pgs.find((item) => item.id === Number(id));

  if (!pg) {
    return <h2 style={{ padding: "20px" }}>PG not found</h2>;
  }

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div
      style={{
        maxWidth: "720px",
        margin: "60px auto",
        padding: "30px",
        background: "#0f172a",
        borderRadius: "16px",
        border: "1px solid #1e293b",
        color: "#e0e7ff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
      }}
    >
      <button
        onClick={() => navigate("/pgs")}
        style={{
          marginBottom: "25px",
          padding: "8px 14px",
          cursor: "pointer",
          backgroundColor: "#1e293b",
          border: "none",
          borderRadius: "6px",
          color: "#cbd5e1",
          fontWeight: "600",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#334155")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1e293b")}
      >
        ← Back
      </button>

      {/* IMAGE SLIDER */}
      {pg.images && pg.images.length > 0 ? (
        <Slider {...settings}>
          {pg.images.map((img, idx) => (
            <div key={idx}>
              <img
                src={img}
                alt={`PG image ${idx + 1}`}
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
            </div>
          ))}
        </Slider>
      ) : (
        <p style={{ marginBottom: "30px", textAlign: "center", opacity: 0.7 }}>
          No images available
        </p>
      )}

      {/* DETAILS BELOW */}
      <h1
        style={{
          marginTop: "30px",
          marginBottom: "20px",
          fontWeight: "700",
          fontSize: "2rem",
          color: "#60a5fa",
          textAlign: "center",
        }}
      >
        {pg.name}
      </h1>

      <div
        style={{
          fontSize: "1.1rem",
          lineHeight: "1.6",
          maxWidth: "480px",
          margin: "0 auto",
        }}
      >
        <p>📍 <strong>Location:</strong> {pg.location}</p>
        <p>👥 <strong>Sharing:</strong> {pg.sharing}</p>
        <p>💰 <strong>Price:</strong> ₹{pg.price}</p>
        <p>
          <strong>Status:</strong>{" "}
          {pg.isVerified ? (
            <span style={{ color: "#34d399", fontWeight: "700" }}>Verified</span>
          ) : (
            <span style={{ color: "#fbbf24", fontWeight: "700" }}>Pending</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default PGDetails;