import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { PGContext } from "../../context/PGContext";

const PGDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pgs } = useContext(PGContext);

  const pg = pgs.find((item) => item.id === Number(id));

  if (!pg) {
    return <h2 style={{ padding: "20px" }}>PG not found</h2>;
  }

  return (
    <div style={{
      maxWidth: "700px",
      margin: "60px auto",
      padding: "30px",
      background: "#0f172a",
      borderRadius: "16px",
      border: "1px solid #1e293b",
     }}>
      <button
        onClick={() => navigate("/pgs")}
        style={{
          marginBottom: "15px",
          padding: "6px 12px",
          cursor: "pointer",
        }}
      >
        ← Back
      </button>

      <h2>{pg.name}</h2>
      <p>📍 Location: {pg.location}</p>
      <p>👥 Sharing: {pg.sharing}</p>
      <p>💰 Price: ₹{pg.price}</p>
      <p>
        Status:{" "}
        {pg.isVerified ? (
          <span style={{ color: "green" }}>Verified</span>
        ) : (
          <span style={{ color: "orange" }}>Pending</span>
        )}
      </p>
    </div>
  );
};

export default PGDetails;
