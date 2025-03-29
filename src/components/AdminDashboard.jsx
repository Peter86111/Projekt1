import React from "react";
import AddNewProduct from "./AddNewProduct";
import UpdateProduct from "./UpdateProduct";
import DeleteProduct from "./DeleteProduct";

const AdminDashboard = () => {
    return (
        <div className="bg-dark" style={styles.container}>
            <h1 className="h1-admin" style={styles.title}>Admin Felület</h1>
           <AddNewProduct />     <UpdateProduct />    <DeleteProduct />
        </div>
    );
};

// Stílusok
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
    },
    title: {
        fontSize: "24px",
        marginBottom: "20px",
        textAlign: "center",
    },    
  };

export default AdminDashboard;
