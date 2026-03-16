import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const [users, setUsers] = useState([
    { name: "Admin", email: "admin@test.com", role: "admin" }
  ]);

  const login = (userData) => {

    setUser(userData);

    setUsers((prev) => {
      const exists = prev.find(u => u.email === userData.email);
      if (exists) return prev;
      return [...prev, userData];
    });

  };

  const logout = () => {
    setUser(null);
  };

  const role = user?.role;

  return (
    <AuthContext.Provider value={{ user, role, users, setUsers, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}