import React, { useState, useEffect } from "react";
import axios from "axios";

function UpdateProduct() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [editProductId, setEditProductId] = useState(null);
  const [editData, setEditData] = useState({
    id: null,
    name: "",
    price: 0,
    description: "",
    categoryId: 1,
    picture: "",
  });

  // Feedback handling
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [editErrors, setEditErrors] = useState({});

  // Initial fetch of products and categories
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Fetch products, optionally by category
  const fetchProducts = async (categoryId) => {
    try {
      const url = categoryId
        ? `https://localhost:7012/api/Products/${categoryId}/products`
        : "https://localhost:7012/api/Products";

      const response = await axios.get(url);
      setProducts(categoryId ? response.data : response.data.result);
    } catch (error) {
      console.error("Hiba a terméklista lekérésekor:", error);
    }
  };

  // Fetch all product categories
  const fetchCategories = async () => {
    try {
      const catRes = await axios.get("https://localhost:7012/api/Categories");
      setCategories(catRes.data);
    } catch (error) {
      console.error("Hiba a kategóriák lekérésekor:", error);
    }
  };

  // Handle category filter dropdown change
  const handleCategoryFilterChange = async (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);

    if (categoryId === "") {
      await fetchProducts();
    } else {
      await fetchProducts(Number(categoryId));
    }
  };

  // Open form for editing a specific product
  const handleEditClick = (product) => {
    setEditProductId(product.id);
    setEditData({ ...product });
    setSuccessMessage("");
    setErrorMessage("");
    setEditErrors({});
  };

  // Update field value during edit
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "categoryId" ? Number(value) : value,
    }));

    // Clear error for current field
    setEditErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Validate before saving changes
  const validateEditData = () => {
    const newErrors = {};
    if (!editData.name) newErrors.name = "Név kötelező";
    if (!editData.price || editData.price <= 0) newErrors.price = "Pozitív ár szükséges";
    if (!editData.description) newErrors.description = "Leírás kötelező";
    if (!editData.picture) newErrors.picture = "Kép URL kötelező";
    if (!editData.categoryId || editData.categoryId < 1) newErrors.categoryId = "Érvényes kategória ID kell";

    setEditErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Send PUT request to save changes
  const handleSave = async () => {
    if (!validateEditData()) {
      setErrorMessage("Kérlek javítsd a hibás mezőket.");
      setSuccessMessage("");
      return;
    }

    try {
      const url = `https://localhost:7012/api/Products?id=${editData.id}`;
      const response = await axios.put(url, editData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        fetchProducts(selectedCategory);
        setSuccessMessage("Sikeres mentés ✅");
        setErrorMessage("");
        setEditProductId(null);
        setEditErrors({});
      } else {
        setErrorMessage("Mentés sikertelen ❌");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("PUT hiba:", error);
      setErrorMessage("Szerverhiba történt ❌");
      setSuccessMessage("");
    }
  };

  // Cancel editing mode
  const handleCancel = () => {
    setEditProductId(null);
    setSuccessMessage("");
    setErrorMessage("");
    setEditErrors({});
  };

  // Render input field with validation styles
  const renderEditInput = (name, label, value, errors, onChange, type = "text") => (
    <div style={{ marginBottom: "10px" }}>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={label}
        style={{
          ...styles.input,
          borderColor: errors[name] ? "crimson" : "#ccc",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      />
      {errors[name] && (
        <div style={{ color: "crimson", fontSize: "13px" }}>{errors[name]}</div>
      )}
    </div>
  );

  return (
    <div style={styles.mainContainer}>
      {/* Category filter dropdown */}
      <div style={styles.filterContainer}>
        <label>Kategória szűrő: </label>
        <select className="admin-select" value={selectedCategory} onChange={handleCategoryFilterChange}>
          <option value="">(Mindegyik)</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.categoryName}
            </option>
          ))}
        </select>
      </div>

      {/* Product cards */}
      <div style={styles.cardList}>
        {products.map((p) => (
          <div key={p.id} style={styles.card}>
            {p.picture && <img src={p.picture} alt={p.name} style={styles.cardImage} />}

            {editProductId === p.id ? (
              <div style={styles.cardBody}>
                {/* Feedback messages */}
                {successMessage && <p style={{ color: "limegreen" }}>{successMessage}</p>}
                {errorMessage && <p style={{ color: "crimson" }}>{errorMessage}</p>}

                {/* Editable input fields */}
                {renderEditInput("name", "Név", editData.name, editErrors, handleEditChange)}
                {renderEditInput("price", "Ár", editData.price, editErrors, handleEditChange, "number")}
                {renderEditInput("description", "Leírás", editData.description, editErrors, handleEditChange)}
                {renderEditInput("categoryId", "Kategória ID", editData.categoryId, editErrors, handleEditChange, "number")}
                {renderEditInput("picture", "Kép URL", editData.picture, editErrors, handleEditChange)}

                <button style={styles.saveButton} onClick={handleSave}>Mentés</button>
                <button style={styles.cancelButton} onClick={handleCancel}>Mégse</button>
              </div>
            ) : (
              <div style={styles.cardBody}>
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <p>{p.price} Ft</p>
                <button style={styles.editButton} onClick={() => handleEditClick(p)}>Módosítás</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Component styles
const styles = {
  mainContainer: {
    padding: "20px",
    backgroundColor: "#222",
    color: "#fff",
    height: "80vh",
    overflow: "auto",
  },
  filterContainer: {
    marginBottom: "20px",
  },
  cardList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  card: {
    width: "220px",
    backgroundColor: "#333",
    borderRadius: "8px",
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: "140px",
    objectFit: "cover",
  },
  cardBody: {
    padding: "10px",
  },
  editButton: {
    padding: "8px 12px",
    backgroundColor: "orange",
    border: "none",
    borderRadius: "4px",
    color: "#fff",
    cursor: "pointer",
  },
  saveButton: {
    padding: "8px 12px",
    backgroundColor: "green",
    border: "none",
    borderRadius: "4px",
    color: "#fff",
    cursor: "pointer",
    marginRight: "5px",
  },
  cancelButton: {
    padding: "8px 12px",
    backgroundColor: "gray",
    border: "none",
    borderRadius: "4px",
    color: "#fff",
    cursor: "pointer",
  },
  input: {
    width: "100%",
    marginBottom: "5px",
    padding: "6px 8px",
    fontSize: "14px",
    borderRadius: "4px",
    outline: "none",
  },
};

export default UpdateProduct;
