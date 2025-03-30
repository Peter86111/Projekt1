import React, { useState, useEffect } from "react";
import axios from "axios";

function ProductManager() {
  // A létező termékek
  const [products, setProducts] = useState([]);

  // Kategóriák a szűrőhöz (pl. GET /api/Categories)
  const [categories, setCategories] = useState([]);
  // Kiválasztott kategória ID szűréshez (üres: mindet mutatjuk)
  const [selectedCategory, setSelectedCategory] = useState("");

  // A szerkesztésre kijelölt termék ID-je
  const [editProductId, setEditProductId] = useState(null);

  // Ide mentjük átmenetileg a szerkesztett termék adatait
  const [editData, setEditData] = useState({
    id: null,
    name: "",
    price: 0,
    description: "",
    categoryId: 1,
    picture: "",
  });

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

  // ----- MÓDOSÍTÁS -----

  // Módosítás gomb megnyomásakor beállítjuk a szerkesztendő terméket
  const handleEditClick = (product) => {
    setEditProductId(product.id);
    setEditData({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      categoryId: product.categoryId,
      picture: product.picture || "",
    });
  };

  // Ha a felhasználó gépel a szerkesztő mezőkbe
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "categoryId" ? Number(value) : value,
    }));
  };

  // Módosítás mentése (PUT)
  const handleSave = async () => {
    if (!editData.id) {
      console.error("Nincs termék ID, nem lehet frissíteni!");
      return;
    }
    try {
      const url = `https://localhost:7012/api/Products?id=${editData.id}`;
      const response = await axios.put(url, editData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        console.log("Termék sikeresen módosítva!");
        // Listát frissítjük
        fetchProducts();
        // Szerkesztő űrlap bezárása
        setEditProductId(null);
      } else {
        console.error("Hiba a módosításkor:", response.status);
      }
    } catch (error) {
      console.error("PUT hiba:", error);
    }
  };

  // Módosítás elvetése
  const handleCancel = () => {
    setEditProductId(null);
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
            {/* Ha ez a kártya van szerkesztés alatt, akkor űrlap jelenik meg */}
            {editProductId === p.id ? (
              <div style={styles.cardBody}>
                <label>Név: </label>
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleEditChange}
                  style={styles.input}
                />
                <label>Ár: </label>
                <input
                  type="number"
                  name="price"
                  value={editData.price}
                  onChange={handleEditChange}
                  style={styles.input}
                />
                <label>Leírás: </label>
                <input
                  type="text"
                  name="description"
                  value={editData.description}
                  onChange={handleEditChange}
                  style={styles.input}
                />
                <label>Kategória ID: </label>
                <input
                  type="number"
                  name="categoryId"
                  value={editData.categoryId}
                  onChange={handleEditChange}
                  style={styles.input}
                />
                <label>Kép URL: </label>
                <input
                  type="text"
                  name="picture"
                  value={editData.picture}
                  onChange={handleEditChange}
                  style={styles.input}
                />
                <div style={styles.buttonsContainer}>
                  <button style={styles.saveButton} onClick={handleSave}>
                    Mentés
                  </button>
                  <button style={styles.cancelButton} onClick={handleCancel}>
                    Mégse
                  </button>
                </div>
              </div>
            ) : (
              // Ha NEM szerkesztjük a kártyát, akkor a sima nézet
              <div style={styles.cardBody}>
                <h3 style={styles.cardTitle}>{p.name}</h3>
                <p style={styles.cardText}>{p.description}</p>
                <p style={styles.cardText}>{p.price} Ft</p>
                <button style={styles.editButton} onClick={() => handleEditClick(p)}>
                  Módosítás
                </button>
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

export default ProductManager;