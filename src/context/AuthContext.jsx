
import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  let storedUser = null;

  try {
    const raw = localStorage.getItem("userInfo");
    storedUser = raw && raw !== "undefined" ? JSON.parse(raw) : null;
  } catch (err) {
    console.error("Invalid userInfo in localStorage", err);
    localStorage.removeItem("userInfo");
    storedUser = null;
  }

  const [user, setUser] = useState(storedUser);

  const login = (userData) => {
    localStorage.setItem("userInfo", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
