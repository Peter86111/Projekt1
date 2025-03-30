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
            navigate("/termekek");
        } catch (error) {
            setError("A regisztráció sikertelen!");
            console.error("Hiba a regisztráció során: ", error);
        }
    };

    return (
        <div className="bg-dark" style={styles.container}>
            <div>
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
    );
};

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
    error: {
        color: "red",
        marginBottom: "10px",
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

export default Registration;
