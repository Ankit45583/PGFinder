import { useNavigate } from "react-router-dom";
import "./owner.css";

const OwnerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="owner-dashboard">
      <h2 className="dashboard-title">Owner Dashboard</h2>

      <div className="dashboard-grid">
        {/* ADD PG */}
        <div className="dashboard-card">
          <h3>➕ Add New PG</h3>
          <p>Add a new PG and submit it for admin verification.</p>
          <button onClick={() => navigate("/owner/add-pg")}>
            Add PG
          </button>
        </div>

        {/* MY PGs */}
        <div className="dashboard-card">
          <h3>🏠 My PGs</h3>
          <p>View and manage all PGs added by you.</p>
          <button onClick={() => navigate("/owner/my-pgs")}>
            View PGs
          </button>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
