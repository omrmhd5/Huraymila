import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (userData) => {
    setUser(userData);
    setSession({ id: Date.now(), createdAt: new Date() });
  };

  const signOut = async () => {
    setUser(null);
    setSession(null);
  };

  const value = {
    user,
    session,
    loading,
    login,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
