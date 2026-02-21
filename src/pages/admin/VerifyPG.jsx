import { useContext } from "react";
import { PGContext } from "../../context/PGContext";
import "./verifypg.css";

const VerifyPG = () => {
  const { pgs, verifyPG } = useContext(PGContext);

  const pendingPGs = pgs.filter(pg => !pg.isVerified);

  return (
    <div className="verify-container">
      <h2>Verify PGs</h2>

      {pendingPGs.length === 0 && (
        <p className="empty-text">No PGs pending verification</p>
      )}

      {pendingPGs.map(pg => (
        <div key={pg.id} className="verify-card">
          <div>
            <h3>{pg.name}</h3>
            <p>📍 {pg.location}</p>
            <p>💰 ₹{pg.price}</p>
          </div>

          <button onClick={() => verifyPG(pg.id)}>
            Verify
          </button>
        </div>
      ))}
    </div>
  );
};

export default VerifyPG;

