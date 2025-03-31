import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 perc = 300 másodperc
  const isAdmin = user?.role === "Admin";

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("jwt");
  }, []);

  // ⏱️ Token betöltés + visszaszámlálás indítása
  useEffect(() => {
    const storedToken = localStorage.getItem("jwt");

    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);

        const displayName =
          decoded.name ||
          (decoded.sub?.includes("@")
            ? decoded.sub.split("@")[0]
            : decoded.sub) ||
          "Ismeretlen";

        setUser({
          username: displayName,
          role: decoded.role || "User",
        });
      } catch (error) {
        console.error("Hibás token vagy lejárt:", error);
        localStorage.removeItem("jwt");
      }
    }
  }, []);

  // ⏲️ Inaktivitás figyelés és visszaszámlálás
  useEffect(() => {
    if (!user) return;

    // Timer minden másodpercben csökkent
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          logout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [user, logout]);

  // 👆 Egérmozgás esetén újraindítjuk a számlálót
  useEffect(() => {
    if (!user) return;

    const resetTimer = () => {
      setTimeLeft(300);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser, isAdmin, timeLeft }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);