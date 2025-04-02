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

  // ✨ Hibakezelés & visszajelzés
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [editErrors, setEditErrors] = useState({});

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // 🔄 Termékek lekérdezése (opcionálisan kategória alapján)
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

  // 🔄 Kategóriák lekérdezése
  const fetchCategories = async () => {
    try {
      const catRes = await axios.get("https://localhost:7012/api/Categories");
      setCategories(catRes.data);
    } catch (error) {
      console.error("Hiba a kategóriák lekérésekor:", error);
    }
  };

  const handleCategoryFilterChange = async (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);

    if (categoryId === "") {
      await fetchProducts();
    } else {
      await fetchProducts(Number(categoryId));
    }
  };

  const handleEditClick = (product) => {
    setEditProductId(product.id);
    setEditData({ ...product });
    setSuccessMessage("");
    setErrorMessage("");
    setEditErrors({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "categoryId" ? Number(value) : value,
    }));

    // ✅ Az adott mező hibáját töröljük, ha elkezdik írni
    setEditErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // 🧠 Validáció mentés előtt
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

  const handleCancel = () => {
    setEditProductId(null);
    setSuccessMessage("");
    setErrorMessage("");
    setEditErrors({});
  };

  // 👇 Külön input render hibakezeléssel
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
      <div style={styles.filterContainer}>
        <label>Kategória szűrő: </label>
        <select value={selectedCategory} onChange={handleCategoryFilterChange}>
          <option value="">(Mindegyik)</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.categoryName}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.cardList}>
        {products.map((p) => (
          <div key={p.id} style={styles.card}>
            {p.picture && <img src={p.picture} alt={p.name} style={styles.cardImage} />}

            {editProductId === p.id ? (
              <div style={styles.cardBody}>
                {/* ✅ Üzenetek */}
                {successMessage && <p style={{ color: "limegreen" }}>{successMessage}</p>}
                {errorMessage && <p style={{ color: "crimson" }}>{errorMessage}</p>}

                {/* 🔧 Mezők szerkesztése */}
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

// 🎨 Stílusok
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