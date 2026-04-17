import { useContext } from "react";
import { PGContext } from "../../context/PGContext";
import "./verifypg.css";

const VerifyPG = () => {
  const { pgs, verifyPG } = useContext(PGContext);

  const pendingPGs = pgs.filter(pg => !pg.isVerified);

  return (
    <div className="verify-container">
  <div className="verify-header">
    <h2>🔍 Verify New PG Listings</h2>
    <p>
      Review pending PG submissions from owners. Verify details, check images,
      and approve quality listings to maintain platform standards.
    </p>
  </div>

  {pendingPGs.length === 0 && (
    <div className="verify-empty">
      <h3>✅ All Caught Up!</h3>
      <p className="empty-text">
        No PGs pending verification. All recent submissions have been reviewed and processed.
      </p>
      <a href="/admin/dashboard" className="verify-back-btn">
        Back to Dashboard →
      </a>
    </div>
  )}

  <div className="verify-grid">
    {pendingPGs.map(pg => (
      <div key={pg.id} className="verify-card">
        {pg.images && pg.images.length > 0 && (
          <img
            src={pg.images[0]}
            alt={pg.name}
            className="verify-image"
          />
        )}

        <h3 className="verify-title">{pg.name}</h3>

        <div className="verify-details">
          <p>📍 <strong>Location:</strong> {pg.location}</p>
          <p>💰 <strong>Price:</strong> ₹{pg.price}/month</p>
          <p>👥 <strong>Sharing:</strong> {pg.sharing}</p>
          <p>📸 <strong>Images:</strong> {pg.images?.length || 0} photos</p>
        </div>

        <div className="verify-checklist">
          <strong>📋 Verification Checklist:</strong>
          <ul>
            <li>Property details are accurate</li>
            <li>Images are clear and legitimate</li>
            <li>Price seems reasonable for location</li>
            <li>Owner information is valid</li>
          </ul>
        </div>

        <div className="verify-actions">
          <button
            className="approve-btn"
            onClick={() => {
              verifyPG(pg.id);
              alert('✅ PG verified and now live for students!');
            }}
          >
            ✅ Approve
          </button>

          <button
            className="reject-btn"
            onClick={() => alert('Rejection feature coming soon!')}
          >
            ❌ Reject
          </button>
        </div>
      </div>
    ))}
  </div>

  {pendingPGs.length > 0 && (
    <div className="verify-footer">
      <p>
        Reviewing {pendingPGs.length} pending submission{pendingPGs.length !== 1 ? 's' : ''}. Keep the platform quality high!
      </p>
    </div>
  )}
</div>
  );
};

export default VerifyPG;

