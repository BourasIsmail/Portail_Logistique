import { createContext, use, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { decode } from "punycode";
import api from "./api";
import { toast } from "sonner";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function getTokenFromCookie() {
  const match =
    document.cookie.match(new RegExp("(^| )jwt=([^;]+)")) ||
    document.cookie.match(new RegExp("(^| )refreshToken=([^;]+)"));
  return match ? match[2] : null;
}

export const getInfoFromToken = (token) => {
  if (!token) {
    console.warn("Token is invalid or expired");
    return null;
  }

  try {
    const decoded = jwtDecode(token);
    return {
      id: decoded.id,
      role: decoded.role,
      username: decoded.username,
      email: decoded.email,
    };
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

export const changePassword = async (id, newPassword) => {
  const token = getTokenFromCookie();
  if (!token) {
    console.warn("No token found");
    toast.error("No token found. Please log in again.");
    return;
  }

  try {
    const response = await api.put(`/admin/change-pass/${id}`, {
      password: newPassword,
    });

    if (!response.ok) {
      toast.error("Failed to change password");
      throw new Error("Failed to change password");
    }

    // const newToken = response.data;
    // const userDetails = getInfoFromToken(newToken);
    // useAuth().login(userDetails);
    toast.success("Password changed successfully");
    console.log("Password changed successfully", data);
  } catch (error) {
    toast.error("Error changing password. Please try again.", error);
    console.error("Error changing password", error);
  }
};

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);

  const login = (userInfo) => {
    console.log("updating user details in AuthProvider");
    console.log(userInfo);
    setUserDetails(userInfo);
  };

  const logout = () => {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    setUserDetails(null);
    console.log("User logged out");
  };

  useEffect(() => {
    const initializeUserDetails = () => {
      if (token) {
        const userInfo = getInfoFromToken(token);
        if (userInfo) {
          setUserDetails(userInfo);
        } else {
          setUserDetails(null);
        }
      } else {
        setUserDetails(null);
      }
    };

    const token = getTokenFromCookie();
    initializeUserDetails(token);
  }, []);

  return (
    <AuthContext.Provider value={{ userDetails, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
