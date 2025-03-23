import React from "react";
import AddNewProduct from "./AddNewProduct";
import UpdateProduct from "./UpdateProduct";
import DeleteProduct from "./DeleteProduct";

const AdminDashboard = () => {
    return (
        <div className="bg-dark">
            <h1 className="h1-admin">Admin Felület</h1>
           <AddNewProduct />     <UpdateProduct />    <DeleteProduct />
        </div>
    );
};

export default AdminDashboard;
