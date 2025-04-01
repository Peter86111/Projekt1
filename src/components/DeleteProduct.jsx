import React, { useState, useEffect } from "react";
import axios from "axios";

function DeleteProduct() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

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
      const response = await axios.get("https://localhost:7012/api/Categories");
      setCategories(response.data);
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7012/api/Products?id=${id}`);
      fetchProducts(selectedCategory);
    } catch (error) {
      console.error("Hiba a termék törlésekor:", error);
    }
  };

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
            <div style={styles.cardBody}>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <p>{p.price} Ft</p>
              <button style={styles.deleteButton} onClick={() => handleDelete(p.id)}>Törlés</button>
            </div>
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
  deleteButton: {
    padding: "8px 12px",
    backgroundColor: "red",
    border: "none",
    borderRadius: "4px",
    color: "#fff",
    cursor: "pointer",
  },
};

export default DeleteProduct;