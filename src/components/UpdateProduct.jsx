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

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

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
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "categoryId" ? Number(value) : value,
    }));
  };

  const handleSave = async () => {
    try {
      const url = `https://localhost:7012/api/Products?id=${editData.id}`;
      const response = await axios.put(url, editData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        fetchProducts(selectedCategory);
        setEditProductId(null);
      }
    } catch (error) {
      console.error("PUT hiba:", error);
    }
  };

  const handleCancel = () => setEditProductId(null);

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
                <input name="name" value={editData.name} onChange={handleEditChange} style={styles.input} />
                <input name="price" type="number" value={editData.price} onChange={handleEditChange} style={styles.input} />
                <input name="description" value={editData.description} onChange={handleEditChange} style={styles.input} />
                <input name="categoryId" type="number" value={editData.categoryId} onChange={handleEditChange} style={styles.input} />
                <input name="picture" value={editData.picture} onChange={handleEditChange} style={styles.input} />
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

// Stílusok
const styles = {
  mainContainer: {
    padding: "20px",
    backgroundColor: "#222",
    color: "#fff",
    height: "80vh",
    overflow: "auto", // hogy görgethető legyen, ha túl magas
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
  cardTitle: {
    fontSize: "18px",
    marginBottom: "5px",
  },
  cardText: {
    margin: 0,
    marginBottom: "8px",
  },
  editButton: {
    padding: "8px 12px",
    backgroundColor: "orange",
    border: "none",
    borderRadius: "4px",
    color: "#fff",
    cursor: "pointer",
  },
  buttonsContainer: {
    marginTop: "10px",
    display: "flex",
    gap: "8px",
  },
  saveButton: {
    padding: "8px 12px",
    backgroundColor: "green",
    border: "none",
    borderRadius: "4px",
    color: "#fff",
    cursor: "pointer",
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
    padding: "4px 6px",
  },
};

export default UpdateProduct;