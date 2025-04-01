import { useCart } from "../context/CartContext";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductBrowser = () => {
  const { dispatch } = useCart();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);

  // 1. Kategóriák lekérése
  useEffect(() => {
    // a useEffect callback NEM async,
    // belül definiálunk és hívunk egy aszinkron függvényt:
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://localhost:7012/api/Categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Hiba a kategóriák lekérésekor", error);
      }
    };
    fetchCategories();
  }, []);

  // 2. Alapértelmezésben MINDEN termék lekérése
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get("https://localhost:7012/api/Products");
        setProducts(response.data.result);
      } catch (error) {
        console.error("Hiba a termékek lekérésekor", error);
      }
    };
    fetchAllProducts();
  }, []);

  // Ha a user változtatja a kategóriát
  const handleCategoryChange = async (categoryId) => {
    setSelectedCategory(categoryId);

    if (!categoryId) {
      // Ha üres (pl. "Válassz...") => újra a teljes lista
      try {
        const allResponse = await axios.get("https://localhost:7012/api/Products");
        setProducts(allResponse.data.result);
      } catch (error) {
        console.error("Hiba az adatok lekérésekor: ", error);
      }
    } else {
      // Lekérjük a kiválasztott kategória termékeit
      try {
        const response = await axios.get(
          `https://localhost:7012/api/Products/${categoryId}/products`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Hiba a szűrt termékek lekérésekor: ", error);
      }
    }
  };

  // Kosárba helyezés
  const handleAddToCart = (Product) => {
    dispatch({ type: "ADD_TO_CART", payload: products });
  };

  return (
    <div className="bg-dark">
      <h1 className="h1-modify bg-dark">Kategóriák</h1>
      <select
        className="bg-dark"
        value={selectedCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
      >
        <option value="">Válassz...</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.categoryName}
          </option>
        ))}
      </select>

      {/* TERMÉKLISTA */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 bg-dark">
        {products && products.length > 0 ? (
          products.map((p) => (
            <div className="col bg-dark border-line-red" key={p.id}>
              <div className="card shadow-sm">
                <img className="img-products" src={p.picture} alt="product" />
                <div className="card-body">
                  <p className="card-text">
                    {p.name} - {p.price} Ft
                    <button className="add-to-cart" onClick={() => handleAddToCart(products)}>Kosárba</button>
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