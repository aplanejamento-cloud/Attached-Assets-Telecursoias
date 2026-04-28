import { useState, useEffect, createContext, useContext } from "react";
import { loginUser, loginWithGoogle, registerUser } from "@/lib/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const result = await loginUser(email, password);
    setUser(result.user);
    localStorage.setItem("user", JSON.stringify(result.user));
  };

  const loginGoogle = async (email, nome, sobrenome) => {
    const result = await loginWithGoogle(email, nome, sobrenome);
    setUser(result.user);
    localStorage.setItem("user", JSON.stringify(result.user));
  };

  const register = async (data) => {
    const result = await registerUser(data);
    setUser(result.user);
    localStorage.setItem("user", JSON.stringify(result.user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, loginGoogle, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
