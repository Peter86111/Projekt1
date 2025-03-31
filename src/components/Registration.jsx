import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Registration = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const valasz = await axios.post("https://localhost:7012/auth/register", {
                userName,
                password,
                email,
            });

            const token = valasz.data;
            localStorage.setItem("jwt", token.token);
            console.log(token.token);
            console.log(token.message);

            setError("");
            navigate("/");
        } catch (error) {
            setError("A regisztráció sikertelen!");
            console.error("Hiba a regisztráció során: ", error);
        }
    };

    return (
        <div style={styles.wrapper}>
          <video
            autoPlay
            muted
            loop
            playsInline
            style={styles.videoBackground}
          >
            <source
              src="Lamborghini_3840_2160_24fps.mp4"
              type="video/mp4"
            />
            A böngésződ nem támogatja a videót.
          </video>
      
          <div style={styles.overlay}>
            <div style={styles.formWrapper}>
              <h1 style={styles.title}>Regisztráció</h1>
              {error && <p style={styles.error}>{error}</p>}
              <div style={styles.inputGroup}>
                <label style={styles.label}>Felhasználónév:</label>
                <input
                  type="text"
                  placeholder="Felhasználónév"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
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
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email:</label>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                />
              </div>
              <button onClick={handleLogin} style={styles.button}>
                Regisztráció
              </button>
            </div>
          </div>
        </div>
      );
};

// Stílusok
const styles = {
    wrapper: {
      position: "relative",
      height: "100vh",
      width: "100vw",
      overflow: "hidden",
    },
    videoBackground: {
      position: "absolute",
      top: 0,
      left: 0,
      minWidth: "100%",
      minHeight: "100%",
      objectFit: "cover",
      zIndex: 0,
    },
    overlay: {
      position: "relative",
      zIndex: 1,
      height: "100%",
      width: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    formWrapper: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      padding: "40px",
      borderRadius: "10px",
      boxShadow: "0 0 20px rgba(0,0,0,0.6)",
      color: "#fff",
      minWidth: "320px",
    },
    title: {
      fontSize: "28px",
      marginBottom: "20px",
      textAlign: "center",
    },
    error: {
      color: "#ff4d4d",
      marginBottom: "10px",
      textAlign: "center",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "15px",
    },
    label: {
      marginBottom: "5px",
      fontWeight: "bold",
    },
    input: {
      padding: "10px",
      fontSize: "16px",
      width: "100%",
      borderRadius: "4px",
      border: "1px solid #ccc",
      outline: "none",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#007bff",
      color: "#fff",
      fontSize: "16px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
  };

export default Registration;
