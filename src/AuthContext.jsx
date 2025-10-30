import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [location, setLocation] = useState("GATE");

  async function signup(username) {
    const res = await fetch(`${API}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || `Signup failed (${res.status})`);
    }
    const data = await res.json();
    setToken(data.token);
    setLocation("TABLET");
  }

  async function authenticate() {
    if (!token) throw new Error("No token in state. Please sign up first.");
    const res = await fetch(`${API}/authenticate`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || `Authentication failed (${res.status})`);
    }
    setLocation("TUNNEL");
  }

  const value = { location, token, signup, authenticate };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
