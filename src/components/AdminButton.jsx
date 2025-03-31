import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminButton = ({ adminName = "Admin" }) => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  if (!isAdmin) return null; // ne jelenjen meg, ha nem admin

  const handleClick = () => {
    navigate("/admin-dashboard");
  };

  return (
    <div className="bg-dark" style={styles.container}>
      <button onClick={handleClick} className="bg-dark px-4 py-2 rounded">
        {adminName}
      </button>
    </div>
  );
};

// Stílus
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
    },    
};

export default AdminButton;