import { useState } from "react";

const RegistrationForm = () => {
  const [role, setRole] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    alert(`${role} registered successfully`);
    console.log({ ...form, role });
  };

  return (
    <>

      {role && (
        <>
          <input name="name" placeholder="Full Name" className="auth-input" onChange={handleChange} />
          <input name="email" placeholder="Email" className="auth-input" onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" className="auth-input" onChange={handleChange} />
          <button className="auth-btn" onClick={handleRegister}>
            Register as {role}
          </button>
        </>
      )}
    </>
  );
};

export default RegistrationForm;
