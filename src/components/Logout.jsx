import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    // Token törlése és user állapot visszaállítása
    localStorage.removeItem("jwt");
    setUser(null);

    // Átirányítás pl. főoldalra vagy loginre
    navigate("/login");
  }, [setUser, navigate]);

  return null; // Nem kell semmit megjelenítenünk
};

export default Logout;