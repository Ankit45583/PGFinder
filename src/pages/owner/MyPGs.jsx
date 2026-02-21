import { useContext } from "react";
import { PGContext } from "../../context/PGContext";
import "./mypgs.css";

const MyPGs = () => {
  const { pgs } = useContext(PGContext);

  const myPGs = pgs.filter(
    (pg) => pg.ownerRole === "owner" || !pg.ownerRole
  );

  return (
    <div className="mypgs-container">
      <h2 className="mypgs-title">My PGs</h2>

      {myPGs.length === 0 && (
        <p className="empty-text">No PGs added yet</p>
      )}

      <div className="mypgs-grid">
        {myPGs.map((pg) => (
          <div key={pg.id} className="mypgs-card">
            <h3>{pg.name}</h3>
            <p>📍 {pg.location}</p>
            <p>💰 ₹{pg.price}</p>

            <span
              className={`status-badge ${
                pg.isVerified ? "verified" : "pending"
              }`}
            >
              {pg.isVerified ? "Verified" : "Pending"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPGs;
