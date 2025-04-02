import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();  

  const handleLogin = async () => {
    try {
      const valasz = await axios.post("https://localhost:7012/auth/login", {
        username,
        password,
      });

      const token = valasz.data;
      localStorage.setItem("jwt", token.token);
      console.log("Token:", token.token);
      console.log("Üzenet:", token.message);

      // ⬇️ Token dekódolása és user beállítása
      const decoded = jwtDecode(token.token);

      setUser({
        username: decoded.sub || decoded.name || "Ismeretlen",
        role: decoded.role || "User",
      });

      setError("");
      navigate("/termekek");
    } catch (error) {
      setError("A hitelesítés sikertelen. Ellenőrizd a bejelentkezési adatokat!");
      console.error("Hiba a bejelentkezés során: ", error);
    }
  };

  return (
    <div className="bg-dark" style={styles.container}>
      <div style={{ backgroundColor: "rgba(0,0,0,0.6)", padding: "40px", borderRadius: "10px" }}>
        <h1 style={styles.title}>Bejelentkezés</h1>
        {error && <p style={styles.error}>{error}</p>}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Felhasználónév:</label>
          <input
            type="text"
            placeholder="Felhasználónév"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Jelszó:</label>
          <input
            type="password"
            placeholder="Jelszó"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        <button onClick={handleLogin} style={styles.button}>
          Bejelentkezés
        </button>
      </div>
    </div>
  );
};

// Stílusok
const styles = {
  container: {
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/Mustang_login.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    overflow: "hidden",
  },
  title: {
    fontSize: "32px",
    marginBottom: "20px",
    textAlign: "center",
    color: "#ffffff",
    textShadow: "0 0 10px black",
  },
  error: {
    color: "#ff4d4d",
    marginBottom: "10px",
    textAlign: "center",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: "15px",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    width: "300px",
    border: "none",
    borderRadius: "4px",
    outline: "none",
  },
  button: {
    padding: "10px 25px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#ff6f00",
    color: "white",
    border: "none",
    borderRadius: "5px",
    marginTop: "10px",
  },
};

export default Login;