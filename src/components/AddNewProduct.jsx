import React, { useState, useEffect } from "react";
import axios from "axios";

function AddNewProduct(props) {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    categoryId: 1, // default 1
    picture: "",   // kép URL
  });

  useEffect(() => {
    // Ha jön termékobjektum, akkor feltöltjük az állapotot
    if (props.productObj) {
      setProductData({
        name: props.productObj.name || "",
        price: props.productObj.price || "",
        description: props.productObj.description || "",
        categoryId: props.productObj.categoryId || 1,
        picture: props.productObj.picture || "", // innen szedjük a kép elérhetőségét
      });
    }
  }, [props.productObj]);

  // Mezők változása
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductData((prev) => ({
      ...prev,
      [name]: name === "categoryId" ? Number(value) : value,
    }));
  };

  // Új termék létrehozása (POST)
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    const url = "https://localhost:7012/api/Products";

    try {
      const response = await axios.post(url, productData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        // Sikeres POST
        props.handleCount?.();
        console.log(response.data.message); // "Sikeres felvétel." (vagy amit a backend küld)
      } else {
        console.log("Hiba: váratlan státuszkód", response.status);
      }
    } catch (error) {
      console.error("Axios POST hiba:", error);
    }
  };

  return (
    <div className="bg-dark" style={styles.container}>
      <h1 className="h1-admin" style={styles.title}>
        <label>Új termék felvétele:</label>
      </h1>
      <form onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Termék neve:</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            placeholder="Termék neve"
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Ár:</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            placeholder="Termék ára"
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Leírás:</label>
          <input
            type="text"
            name="description"
            value={productData.description}
            onChange={handleChange}
            placeholder="Termék leírása"
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Kategória (ID):</label>
          <input
            type="number"
            name="categoryId"
            value={productData.categoryId}
            onChange={handleChange}
            placeholder="Termék kategória azonosítója"
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Kép (URL):</label>
          <input
            type="text"
            name="picture"
            value={productData.picture}
            onChange={handleChange}
            placeholder="Kép URL-címe"
            style={styles.input}
          />
        </div>
        <button style={styles.button} type="submit">
          Új termék mentése
        </button>
      </form>
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

export default AddNewProduct;