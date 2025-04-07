import React, { useState, useEffect } from "react";
import axios from "axios";

function AddNewProduct(props) {
  // Initial state for the product form
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    categoryId: 1,
    picture: "",
  });

  // Feedback messages and form errors
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});

  // Populate form if editing an existing product
  useEffect(() => {
    if (props.productObj) {
      setProductData({
        name: props.productObj.name || "",
        price: props.productObj.price || "",
        description: props.productObj.description || "",
        categoryId: props.productObj.categoryId || 1,
        picture: props.productObj.picture || "",
      });
    }
  }, [props.productObj]);

  // Handle input changes and reset errors
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductData((prev) => ({
      ...prev,
      [name]: name === "categoryId" ? Number(value) : value,
    }));

    // Clear error when the user starts editing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // Validate input before submitting
  const validate = () => {
    const newErrors = {};
    if (!productData.name) newErrors.name = "Név kötelező";
    if (!productData.price || productData.price <= 0) newErrors.price = "Pozitív ár szükséges";
    if (!productData.description) newErrors.description = "Leírás kötelező";
    if (!productData.picture) newErrors.picture = "Kép URL kötelező";
    if (!productData.categoryId || productData.categoryId < 1) newErrors.categoryId = "Érvényes kategória ID kell";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit product to backend API
  const handleSubmit = async (event) => {
    event.preventDefault();

    // If validation fails, show error and stop submission
    if (!validate()) {
      setErrorMessage("Kérlek töltsd ki a mezőket helyesen.");
      setSuccessMessage("");
      return;
    }

    const url = "https://localhost:7012/api/Products";

    try {
      const response = await axios.post(url, productData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Handle successful submission
      if (response.status === 201) {
        props.handleCount?.();
        setSuccessMessage("Sikeresen mentve ✅");
        setErrorMessage("");
        setProductData({
          name: "",
          price: "",
          description: "",
          categoryId: 1,
          picture: "",
        });
        setErrors({});
      } else {
        setErrorMessage("Mentés nem sikerült ❌");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Axios POST hiba:", error);
      setErrorMessage("Szerverhiba történt ❌");
      setSuccessMessage("");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Új termék felvétele</h1>

      {/* Feedback messages */}
      {successMessage && <p style={{ color: "limegreen" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "crimson" }}>{errorMessage}</p>}

      {/* Product form */}
      <form onSubmit={handleSubmit}>
        {renderInput("name", "Termék neve:", "text", productData.name, errors, handleChange)}
        {renderInput("price", "Ár:", "number", productData.price, errors, handleChange)}
        {renderInput("description", "Leírás:", "text", productData.description, errors, handleChange)}
        {renderInput("categoryId", "Kategória (ID):", "number", productData.categoryId, errors, handleChange)}
        {renderInput("picture", "Kép (URL):", "text", productData.picture, errors, handleChange)}

        <button style={styles.button} type="submit">
          Új termék mentése
        </button>
      </form>
    </div>
  );
}

// 🧩 Helper function to render input field with error display
function renderInput(name, label, type, value, errors, handleChange) {
  return (
    <div style={styles.inputGroup}>
      <label style={styles.label}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={label}
        style={{
          ...styles.input,
          borderColor: errors[name] ? "crimson" : "#ccc",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      />
      {errors[name] && <span style={{ color: "crimson", fontSize: "14px" }}>{errors[name]}</span>}
    </div>
  );
}

// Inline style definitions
const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    padding: "30px",
    borderRadius: "10px",
    backgroundColor: "#1e1e1e",
    color: "#f1f1f1",
    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "26px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "15px",
  },
  label: {
    marginBottom: "5px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    outline: "none",
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default AddNewProduct;
