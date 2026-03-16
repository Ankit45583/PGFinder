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

      <p className="admin-welcome">
        Welcome Admin 👋 Manage PG listings and verify new properties.
      </p>

      <div className="admin-cards">

        <div className="admin-card">
          <h3>Total PGs</h3>
          <p>{total}</p>
          <span className="card-info">All PG listings in the system</span>
        </div>

        <div className="admin-card verified">
          <h3>Verified PGs</h3>
          <p>{verified}</p>
          <span className="card-info">Approved and visible to students</span>
        </div>

        <div className="admin-card pending">
          <h3>Pending PGs</h3>
          <p>{pending}</p>
          <span className="card-info">Waiting for admin approval</span>
        </div>

      </div>

      <div className="admin-actions">

        <button
          className="admin-action-btn"
          onClick={() => navigate("/admin/verify-pg")}
        >
          Verify PGs →
        </button>

        <button
          className="admin-secondary-btn"
          onClick={() => navigate("/admin/users")}
        >
          Manage Users →
        </button>

      </div>

    </div>
  );
};

export default AdminDashboard;