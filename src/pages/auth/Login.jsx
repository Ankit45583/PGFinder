import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import LoginForm from "../../components/forms/LoginForm";
import "./login.css";

const Login = () => {
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    login({ email, role });

    if (role === "admin") navigate("/admin/dashboard");
    else if (role === "owner") navigate("/owner/dashboard");
    else navigate("/");
  };

  return (
    <div className="auth-container">
      <h2>Login to FindMyPG</h2>

      {/* ROLE SELECTION */}
      {!role && (
        <div className="role-box">
          <button onClick={() => setRole("student")}>Student</button>
          <button onClick={() => setRole("owner")}>Owner</button>
          <button onClick={() => setRole("admin")}>Admin</button>
        </div>
      )}

      {/* LOGIN FORM */}
      {role && (
        <>
          <p className="role-label">Logging in as <b>{role}</b></p>

          <input
            type="email"
            placeholder={`${role} email`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
          />

          <button className="auth-btn" onClick={handleLogin}>
            Login
          </button>
        </>
      )}
    </div>
  );
};

export default Login;


