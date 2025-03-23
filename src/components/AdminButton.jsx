import React from "react";
import { useNavigate } from "react-router-dom";

const AdminButton = ({ adminName = "Admin" }) => {
    const navigate = useNavigate(); 

    const handleClick = () => {
        navigate("/admin-dashboard"); 
    };

    return (
        <button 
            onClick={handleClick} 
            className="bg-blue-500 text-black px-4 py-2 rounded">
            {adminName} {}
        </button>
    );
};

export default AdminButton;

