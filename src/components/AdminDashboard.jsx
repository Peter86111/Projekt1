import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import AddNewProduct from "./AddNewProduct";
import UpdateProduct from "./UpdateProduct";
import DeleteProduct from "./DeleteProduct";
import BookedAppointments from "./BookedAppointments";
import { useAuth } from "../context/AuthContext";

export default function AdminDashboard() {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div style={styles.background}>
      <div style={styles.overlay}></div>
      <div style={styles.container}>
        <h2 style={styles.title}>Admin Dashboard</h2>

        <nav style={styles.nav}>
          <Link to="/admin/create" style={styles.navLink}>
            Új termék felvétele
          </Link>
          <Link to="/admin/update" style={styles.navLink}>
            Termék módosítása
          </Link>
          <Link to="/admin/delete" style={styles.navLink}>
            Termék törlése
          </Link>
          <Link to="/admin/booked-appointments" style={styles.navLink}>  {/* Új link */}
            Foglalt időpontok
          </Link>
        </nav>

        <div style={styles.content}>
          <Routes>
            <Route path="" element={<p style={styles.placeholder}>Kérlek válassz az Admin menüből!</p>} />
            <Route path="create" element={<AddNewProduct />} />
            <Route path="update" element={<UpdateProduct />} />
            <Route path="delete" element={<DeleteProduct />} />
            <Route path="booked-appointments" element={<BookedAppointments />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

// 💅 Modern sötét háttér, világos kártya, háttér effekt
const styles = {
  background: {
    position: "relative",
    minHeight: "100vh",
    backgroundColor: "#121212", // főoldal háttér
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "radial-gradient(circle at 30% 30%, rgba(0, 123, 255, 0.15), transparent), radial-gradient(circle at 70% 70%, rgba(255, 0, 150, 0.1), transparent)",
    backdropFilter: "blur(6px)",
    zIndex: 0,
  },
  container: {
    position: "relative",
    zIndex: 1,
    maxWidth: "900px",
    width: "100%",
    backgroundColor: "#1e1e1e", // egyedi sötét háttér csak a dashboard-nak
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#f1f1f1",
  },
  title: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: "30px",
  },
  nav: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "30px",
    flexWrap: "wrap",
  },
  navLink: {
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "8px",
    fontSize: "16px",
    transition: "all 0.3s ease",
  },
  content: {
    textAlign: "center",
  },
  placeholder: {
    color: "#aaa",
    fontStyle: "italic",
  },
};