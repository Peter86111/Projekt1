import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const valasz = await axios.post("https://szallasjwt.sulla.hu/login", {
        Username,
        Password,
      });
      const token = valasz.data.token;
      localStorage.setItem("jwt", token);
      setError("");
      navigate("/SzallasList");
    } catch (error) {
      setError(
        "Hitelesítés sikertelen. Ellenőrízd a bejelentkezési adatokat!"
      );
      console.error("Hiba a bejelentkezés során: ", error);
    }
  };

  return (
    <div ref={vantaRef} style={{ height: "100vh", width: "100%", position: "relative" }}>
      <div style={styles.container}>
        <h1 style={styles.title}>Bejelentkezés</h1>
        {error && <p style={styles.error}>{error}</p>}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Felhasználónév:</label>
          <input
            type="text"
            placeholder="Username"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Jelszó:</label>
          <input
            type="password"
            placeholder="jelszó"
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