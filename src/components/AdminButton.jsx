import React from "react";
import { useNavigate } from "react-router-dom";

const AdminButton = ({ adminName = "Admin" }) => {
    const navigate = useNavigate(); 

    const handleClick = () => {
        navigate("/admin-dashboard"); 
    };

    return (
        <div className="bg-dark">
        <button 
            onClick={handleClick} 
            className="bg-dark px-4 py-2 rounded">
            {adminName}
        </button>
        </div>

    );
};

export default AdminButton;

