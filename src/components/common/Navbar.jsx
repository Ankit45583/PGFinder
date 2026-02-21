import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.css";

const Navbar = () => {
  const { user, role, logout } = useContext(AuthContext);

  return (
    <header className="navbar-wrapper">
      <nav className="navbar">
        <h2 className="logo">FindMyPG</h2>

        <div className="nav-links">
          <NavLink to="/" end>Home</NavLink>

          {(!user || role === "student") && (
            <NavLink to="/pgs">PGs</NavLink>
          )}
        </div>

        <div className="nav-links dev-links">
          {!user && (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}

          {user && role === "student" && (
            <>
              <span className="role-badge">Student</span>
              <NavLink to="/my-bookings">My Bookings</NavLink>
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </>
          )}

          {user && role === "owner" && (
            <>
              <span className="role-badge owner">Owner</span>
              <NavLink to="/owner/dashboard">Dashboard</NavLink>
              <NavLink to="/owner/add-pg">Add PG</NavLink>
              <NavLink to="/owner/my-pgs">My PGs</NavLink>
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </>
          )}

          {user && role === "admin" && (
            <>
              <span className="role-badge admin">Admin</span>
              <NavLink to="/admin/dashboard">Dashboard</NavLink>
              <NavLink to="/admin/verify-pg">Verify PG</NavLink>
              <NavLink to="/admin/users">Users</NavLink>
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

