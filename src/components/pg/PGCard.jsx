import { useNavigate } from "react-router-dom";

const PGCard = ({ pg }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/pg/${pg.id}`)}
      style={{
        cursor: "pointer",
        background: "#111827",
        borderRadius: "14px",
        padding: "20px",
        border: "1px solid #1f2937",
        transition: "all 0.25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* IMAGE */}
      {pg.images && pg.images.length > 0 && (
        <img
          src={pg.images[0]}
          alt={pg.name}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            borderRadius: "12px",
            marginBottom: "15px",
          }}
        />
      )}

      <h3 style={{ marginBottom: "10px", color: "#e5e7eb" }}>
        {pg.name}
      </h3>

      <p>📍 {pg.location}</p>
      <p>👥 {pg.sharing}</p>
      <p style={{ fontWeight: "bold", color: "#00e5ff" }}>
        ₹{pg.price}
      </p>

      <span
        style={{
          display: "inline-block",
          marginTop: "12px",
          padding: "6px 12px",
          borderRadius: "20px",
          fontSize: "12px",
          background: "#064e3b",
          color: "#34d399",
          fontWeight: 600,
        }}
      >
        ✔ Verified
      </span>
    </div>
  );
};

export default PGCard;