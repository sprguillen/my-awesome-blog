"use client";
import {
  createContext,
  useCallback,
  useEffect,
  useState
} from "react";

export const AuthContext = createContext({ user: null, refreshSession: () => {}, });

/**
 * Simple state management to check if user is logged-in. I thought using Redux Tookit would be an overkill on this use case.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  /**
   * Utilized useCallback here to make sure that this async function doesnt get called every render
   * and call the API to get the current user data if the user is logged in
   */
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
