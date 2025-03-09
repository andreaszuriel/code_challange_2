"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import Backendless from "@/lib/backendless";

interface User {
  objectId: string;
  username: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  userToken: string | null; // for navbar compatibility
  authToken: string | null; // for user profile compatibility
  objectId: string | null; // for navbar compatibility
  userId: string | null; // for user profile compatibility
  username: string | null;
  login: (token: string, userId: string) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [objectId, setObjectId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  // Fetch user details (for navbar display)
  const refreshUser = async () => {
    if (!userId) return; // Only fetch if userId is available

    try {
      const user = (await Backendless.Data.of("Users").findById(userId)) as User;
      if (user) {
        setUsername(user.username);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      // Don't force logout immediately, just log the error
    }
  };

  useEffect(() => {
    const token = Cookies.get("userToken") || Cookies.get("authToken") || null;
    const storedObjectId = Cookies.get("objectId") || null;
    const storedUserId = Cookies.get("userId") || null;

    if (token && storedUserId) {
      setIsAuthenticated(true);
      setUserToken(token);
      setAuthToken(token);
      setObjectId(storedObjectId);
      setUserId(storedUserId);
      refreshUser(); // Fetch latest username
    }
  }, []);

  const login = (token: string, userId: string) => {
    Cookies.set("userToken", token, { expires: 7 });
    Cookies.set("authToken", token, { expires: 7 });
    Cookies.set("objectId", userId, { expires: 7 });
    Cookies.set("userId", userId, { expires: 7 });

    setIsAuthenticated(true);
    setUserToken(token);
    setAuthToken(token);
    setObjectId(userId);
    setUserId(userId);
    refreshUser(); // Fetch username after login
  };

  const logout = async () => {
    try {
      await Backendless.UserService.logout(); // Ensure Backendless logs out the user
    } catch (error) {
      console.error("Backendless logout failed:", error);
    }

    Cookies.remove("userToken");
    Cookies.remove("authToken");
    Cookies.remove("objectId");
    Cookies.remove("userId");

    setIsAuthenticated(false);
    setUserToken(null);
    setAuthToken(null);
    setObjectId(null);
    setUserId(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userToken,
        authToken,
        objectId,
        userId,
        username,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
