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

      <div style={{marginBottom: '40px'}}>
        <h2 className="admin-title">⚙️ Admin Control Panel</h2>
        <p className="admin-welcome" style={{color: '#9ca3af', fontSize: '16px', marginTop: '8px'}}>
          Manage the platform, verify new PG listings, monitor user activity, and ensure quality standards across all properties.
        </p>
      </div>

      <div className="admin-cards">

        <div className="admin-card">
          <div style={{fontSize: '28px', marginBottom: '12px'}}>📊</div>
          <h3>Total PGs</h3>
          <p style={{fontSize: '32px', fontWeight: '700', color: '#22d3ee'}}>{total}</p>
          <span className="card-info">All PG listings in the system</span>
          <div style={{marginTop: '12px', fontSize: '13px', color: '#9ca3af'}}>
            📈 Growing your platform inventory
          </div>
        </div>

        <div className="admin-card verified">
          <div style={{fontSize: '28px', marginBottom: '12px'}}>✅</div>
          <h3>Verified PGs</h3>
          <p style={{fontSize: '32px', fontWeight: '700', color: '#10b981'}}>{verified}</p>
          <span className="card-info">Approved and visible to students</span>
          <div style={{marginTop: '12px', fontSize: '13px', color: '#9ca3af'}}>
            {verified > 0 ? `${Math.round((verified/total)*100)}% approval rate` : 'Start verifying listings'}
          </div>
        </div>

        <div className="admin-card pending">
          <div style={{fontSize: '28px', marginBottom: '12px'}}>⏳</div>
          <h3>Pending Verification</h3>
          <p style={{fontSize: '32px', fontWeight: '700', color: '#f59e0b'}}>{pending}</p>
          <span className="card-info">Awaiting admin approval</span>
          <div style={{marginTop: '12px', fontSize: '13px', color: '#9ca3af'}}>
            {pending > 0 ? `${pending} listings to review` : 'All caught up! ✓'}
          </div>
        </div>

      </div>

      <div className="admin-actions">

        <button
          className="admin-action-btn"
          onClick={() => navigate("/admin/verify-pg")}
          style={{cursor: 'pointer', border: 'none'}}
        >
          🔍 Review Pending PGs ({pending})
        </button>

        <button
          className="admin-secondary-btn"
          onClick={() => navigate("/admin/users")}
          style={{cursor: 'pointer', border: 'none'}}
        >
          👥 Manage Users
        </button>

        <button
          className="admin-secondary-btn"
          onClick={() => alert('Reports coming soon! 📊')}
          style={{cursor: 'pointer', border: 'none'}}
        >
          📈 View Reports
        </button>

      </div>

      {/* QUICK ACTIONS */}
      <div style={{marginTop: '40px', padding: '24px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(34, 211, 238, 0.05))', borderRadius: '16px', border: '1px solid rgba(99, 102, 241, 0.2)'}}>
        <h3 style={{color: '#f8f9fa', marginBottom: '16px', fontSize: '16px', fontWeight: '700'}}>📋 Recent Activities</h3>
        <ul style={{color: '#9ca3af', lineHeight: '1.8', fontSize: '14px', listStyle: 'none', padding: 0}}>
          <li>✓ {verified} PG listings successfully verified</li>
          <li>⏳ {pending} new submissions awaiting review</li>
          <li>👥 Platform users are actively searching</li>
          <li>📊 System health: Excellent</li>
        </ul>
      </div>

    </div>
  );
};

export default AdminDashboard;