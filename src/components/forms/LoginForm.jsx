import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const LoginForm = () => {
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const redirectByRole = (r) => {
    if (r === "admin") navigate("/admin/dashboard");
    else if (r === "owner") navigate("/owner/dashboard");
    else navigate("/");
  };

  const handleLogin = () => {
    login({ email, role });
    redirectByRole(role);
  };

  return (
    <>
      {!role && (
        <div className="role-box">
          <button onClick={() => setRole("student")}>Student</button>
          <button onClick={() => setRole("owner")}>Owner</button>
          <button onClick={() => setRole("admin")}>Admin</button>
        </div>
      )}

      {role && (
        <>
          <input
            className="auth-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="auth-btn" onClick={handleLogin}>
            Login as {role}
          </button>
        </>
      )}
    </>
  );
};

export default LoginForm;
