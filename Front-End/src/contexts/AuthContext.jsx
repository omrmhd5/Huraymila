import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Check for existing token on app load
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        // Error parsing stored user data
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  // Unified login function that works for both governor and agency
  const login = async (email, password) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"
        }/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();

      // Store token and user data
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);

      return {
        success: true,
        redirectTo: data.redirectTo,
        userType: data.type,
      };
    } catch (error) {
      // Login error
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    // Navigation will be handled by the component that calls logout
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!token && !!user;
  };

  // Get auth headers for API calls
  const getAuthHeaders = () => {
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  };

  // Fetch current user data from server
  const fetchCurrentUser = async () => {
    if (!token) return null;

    // Capture the token used for this request so we can detect logout
    const currentToken = token;

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"
        }/auth/me`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.user) {
          // If the auth token changed (e.g. user logged out) skip updating state
          const storedToken = localStorage.getItem("authToken");
          if (!storedToken || storedToken !== currentToken) {
            return null;
          }

          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
          return data.user;
        }
      }
      return null;
    } catch (error) {
      // Error fetching current user
      return null;
    }
  };

  // Volunteer signup function
  const volunteerSignup = async (fullName, email, password, phoneNumber) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"
        }/auth/volunteer/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fullName, email, password, phoneNumber }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Store token and user data
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);

        return {
          success: true,
          redirectTo: data.redirectTo,
          message: data.message,
        };
      } else {
        return {
          success: false,
          error: data.message,
        };
      }
    } catch (error) {
      // Volunteer signup error
      return {
        success: false,
        error: "Network error occurred",
      };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    token,
    login,
    logout,
    isAuthenticated,
    getAuthHeaders,
    fetchCurrentUser,
    volunteerSignup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
