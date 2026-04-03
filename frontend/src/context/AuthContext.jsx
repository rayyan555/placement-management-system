import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const login = (data) => {

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    setUser(data);

  };

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setUser(null);

  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};