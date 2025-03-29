import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () =>
{
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () =>
  {
    try
    {
      const valasz = await axios.post("https://localhost:7012/auth/login", {
        username,
        password,
      });

      const token = valasz.data;
      localStorage.setItem("jwt", token.token);
      console.log(token.token);
      console.log(token.message);
      /*var x = localStorage.getItem("jwt");
      var y = jwtDecode(x);

      if (y.role == "Admin")*/
      setError("");
      navigate("/termekek");
    } catch (error)
    {
      setError("Hitelesítés sikertelen. Ellenőrizd a bejelentkezési adatokat!");
      console.error("Hiba a bejelentkezés során: ", error);
    }
  };

  return (
    <div className="bg-dark">
      <div>
        <h1 style={styles.title}>Bejelentkezés</h1>
        {error && <p style={styles.error}>{error}</p>}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Felhasználónév:</label>
          <input
            type="text"
            placeholder="Felhasználónév"
            value={username} // <-- Itt javítva lett
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
  },
};

export default Login;
