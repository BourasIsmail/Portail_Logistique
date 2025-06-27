import { createContext, useContext, useState } from "react";
import api from "./api";

// Create the context
const AuthContext = createContext();

// Create a custom hook for using the context
export const useAuth = () => useContext(AuthContext);

export const loadUserDetails = async (login, logout) => {
  console.log("loading data");
  try {
    const res = await api.get("/auth/user");

    login(res.data);
    return true;
  } catch (e) {
    logout();
    console.warn(e);
    return false;
  }
};

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);

  const login = (data) => {
    setUserDetails(data);
  };

  const logout = () => {
    setUserDetails(null);
  };

  return (
    <AuthContext.Provider value={{ userDetails, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
