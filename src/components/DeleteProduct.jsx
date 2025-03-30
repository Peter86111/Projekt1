import React, { useState, useEffect } from "react";
import axios from "axios";

function ProductManager() {

  // A létező termékek
  const [products, setProducts] = useState([]);

  // Kategóriák a szűrőhöz (pl. GET /api/Categories)
  const [categories, setCategories] = useState([]);
  // Kiválasztott kategória ID szűréshez (üres: mindet mutatjuk)
  const [selectedCategory, setSelectedCategory] = useState("");

  // Termékek betöltése
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://localhost:7012/api/Products");
      // Pl. { result: [ {id, name, price, categoryId,...}, ... ], message: "..." }
      setProducts(response.data.result);
    } catch (error) {
      console.error("Hiba a terméklista lekérésekor:", error);
    }
  };

  // Kategóriák betöltése (GET /api/Categories)
  const fetchCategories = async () => {
    try {
      const catRes = await axios.get("https://localhost:7012/api/Categories");
      // Tegyük fel, catRes.data = [{ id: 1, categoryName: "Kategória1" }, ...]
      setCategories(catRes.data);
    } catch (error) {
      console.error("Hiba a kategóriák lekérésekor:", error);
    }
  };

  // Kategória-szűrő változása
  const handleCategoryFilterChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Szűrés logika: ha selectedCategory üres, minden terméket mutatunk,
  // ha van benne valami, akkor p.categoryId === selectedCategory
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.categoryId === Number(selectedCategory))
    : products; 

  // Törlés (DELETE)
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7012/api/Products?id=${id}`);
      // Sikeres törlés után lista frissítése
      fetchProducts();
    } catch (error) {
      console.error("Hiba a termék törlésekor:", error);
    }
  };

  return (
    <div style={styles.mainContainer}>
      {/* KATEGÓRIA SZŰRŐ */}
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

      {/* KÁRTYÁK – Szűrt terméklista */}
      <div style={styles.cardList}>
        {filteredProducts.map((p) => (
          <div key={p.id} style={styles.card}>
            {/* Ha p.picture létezik, megjelenítjük */}
            {p.picture && (
              <img src={p.picture} alt={p.name} style={styles.cardImage} />
            )}
            <div style={styles.cardBody}>
              <h3 style={styles.cardTitle}>{p.name}</h3>
              <p style={styles.cardText}>{p.description}</p>
              <p style={styles.cardText}>{p.price} Ft</p>
              <button style={styles.deleteButton} onClick={() => handleDelete(p.id)}>
                Törlés
              </button>
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

export default ProductManager;