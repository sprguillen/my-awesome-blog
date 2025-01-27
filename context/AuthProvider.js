"use client";
import {
  createContext,
  useCallback,
  useEffect,
  useState
} from "react";

export const AuthContext = createContext({ user: null, refreshSession: () => {}, });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/users", {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const refreshSession = () => {
    fetchUser();
  };

  return (
    <AuthContext.Provider value={{ user, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
}
