import { useContext } from "react";
import { PGContext } from "../../context/PGContext";
import { useNavigate } from "react-router-dom";
import "./admin.css";

const AdminDashboard = () => {
  const { pgs } = useContext(PGContext);
  const navigate = useNavigate();

  const total = pgs.length;
  const verified = pgs.filter(pg => pg.isVerified).length;
  const pending = total - verified;

  return (
    <div className="admin-dashboard">
      <h2 className="admin-title">Admin Dashboard</h2>

      <div className="admin-cards">
        <div className="admin-card">
          <h3>Total PGs</h3>
          <p>{total}</p>
        </div>

        <div className="admin-card verified">
          <h3>Verified PGs</h3>
          <p>{verified}</p>
        </div>

        <div className="admin-card pending">
          <h3>Pending PGs</h3>
          <p>{pending}</p>
        </div>
      </div>

      <button
        className="admin-action-btn"
        onClick={() => navigate("/admin/verify-pg")}
      >
        Verify PGs →
      </button>
    </div>
  );
};

export default AdminDashboard;
