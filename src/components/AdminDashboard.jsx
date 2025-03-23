import React from "react";
import AddNewProduct from "./AddNewProduct";
import UpdateProduct from "./UpdateProduct";
import DeleteProduct from "./DeleteProduct";

const AdminDashboard = () => {
    return (
        <div>
            <h1>Admin Felület</h1>
           <AddNewProduct />     <UpdateProduct />    <DeleteProduct />
        </div>
    );
};

export default AdminDashboard;
