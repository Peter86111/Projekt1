import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    // Remove JWT token and reset user state
    localStorage.removeItem("jwt");
    setUser(null);

    // Redirect to login or home page
    navigate("/login");
  }, [setUser, navigate]);

  return null; // No UI is needed for this component
};

export default Logout;
