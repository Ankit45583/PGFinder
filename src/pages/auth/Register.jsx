import { useState } from "react";
import RegistrationForm from "../../components/forms/RegistrationForm";
import "./register.css";

const Register = () => {
  const [role, setRole] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    console.log({ name, email, password, role });
    alert(`${role} registered successfully`);
  };

  return (
    <div className="auth-container">
      <h2>Register on FindMyPG</h2>
      <RegistrationForm/>

      {/* ROLE SELECTION */}
      {!role && (
        <div className="role-box">
          <button onClick={() => setRole("student")}>Student</button>
          <button onClick={() => setRole("owner")}>Owner</button>
        </div>
      )}

      {/* REGISTER FORM */}
      {role && (
        <>
          <p className="role-label">Registering as <b>{role}</b></p>

          <input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="auth-input"
          />

          <input
            placeholder="Email"
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

          <button className="auth-btn" onClick={handleRegister}>
            Register
          </button>
        </>
      )}
    </div>
  );
};

export default Register;
