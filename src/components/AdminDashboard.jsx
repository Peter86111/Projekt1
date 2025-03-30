import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import AddNewProduct from "./AddNewProduct";
import UpdateProduct from "./UpdateProduct";
import DeleteProduct from "./DeleteProduct";

export default function AdminDashboard() {
  return (
    <div className="bg-dark" style={styles.container}>
      <h2 style={styles.title}>Admin Dashboard</h2>

      {/* Itt csinálunk egy mini-menüt a 3 funkcióhoz */}
      <nav style={{ marginBottom: "15px" }}>
        <Link to="/admin/create" style={{ marginRight: "10px" }}>
          Új termék felvétele
        </Link>
        <Link to="/admin/update" style={{ marginRight: "10px" }}>
          Termék módosítása
        </Link>
        <Link to="/admin/delete" style={{ marginRight: "10px" }}>
          Termék törlése
        </Link>
      </nav>

      {/* Nested Routes - a "create", "update", "delete" útvonalakat itt kezeljük */}
      <Routes>
        {/* Ha csak /admin a path, pl. Admin főoldal */}
        <Route
          path=""
          element={<p>Kérlek válassz az Admin menüből!</p>}
        />

        {/* Ha /admin/create */}
        <Route path="create" element={<AddNewProduct />} />

        {/* Ha /admin/update */}
        <Route path="update" element={<UpdateProduct />} />

        {/* Ha /admin/delete */}
        <Route path="delete" element={<DeleteProduct />} />
      </Routes>
    </div>
  );
}

// Stílusok
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "15px",
  },
  label: {
    marginBottom: "5px",
  },
  input: {
    padding: "8px",
    fontSize: "16px",
    width: "250px",
  },
  button: {
    display: "block",
    margin: "0 auto",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    textAlign: "center",
  },
};
