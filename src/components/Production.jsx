import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductBrowser = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);

  // Kategóriák lekérése
  useEffect(async () => {
    await axios.get("https://localhost:7012/api/Categories")
      .then((restore) => setCategories(restore.data))
      .catch((error) => console.error("Hiba a kategóriák lekérésekor", error));
  }, []);

  // Alapértelmezésben MINDEN termék lekérése
  useEffect(async () => {
    await axios.get("https://localhost:7012/api/Products") // Adjon vissza MINDEN terméket
      .then((restore) => {
        setProducts(restore.data.result);
      })
      .catch((error) => console.error("Hiba a termékek lekérésekor", error));
  }, []);

  // Ha a user változtatja a kategóriát
  const handleCategoryChange = async (categoryId) => {
    setSelectedCategory(categoryId);

    if (!categoryId) {
      // Ha üres (pl. "Válassz...")
      // akkor újra töltheted a teljes listát
      try {
        const allResponse = await axios.get("https://localhost:7012/api/Products");
        setProducts(allResponse.data.result);
      } catch (error) {
        console.error("Hiba az adatok lekérésekor: ", error);
      }
    } else {
      // Lekérjük a kiválasztott kategória termékeit
      try {
        const response = await axios.get(`https://localhost:7012/api/Products/${categoryId}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Hiba a szűrt termékek lekérésekor: ", error);
      }
    }
  };

  return (
    <div>
      <h1 className="h1-modify">Kategóriák</h1>
      <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
        <option value="">Válassz...</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.categoryName}
          </option>
        ))}
      </select>

      {/* TERMÉKLISTA */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {products && products.length > 0 ? (
          products.map((p) => (
            <div className="col border-line-red" key={p.id}>
              <div className="card shadow-sm">
                <img className="img-products" src={p.picture} alt="product" />
                <div className="card-body">
                  <p className="card-text">
                    {p.name} - {p.price} Ft
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-products">Nincsenek elérhető termékek</p>
        )}
      </div>
    </div>
  );
};

export default ProductBrowser;