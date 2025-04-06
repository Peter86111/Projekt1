import { useCart } from "../context/CartContext";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductBrowser = () => {
  const { dispatch } = useCart();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  
  const navigate = useNavigate();

  // Remove the redundant definition of handleProductClick
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  useEffect(() => {
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

  const handleCategoryChange = async (categoryId) => {
    setSelectedCategory(categoryId);

    if (!categoryId) {
      try {
        const allResponse = await axios.get("https://localhost:7012/api/Products");
        setProducts(allResponse.data.result);
      } catch (error) {
        console.error("Hiba az adatok lekérésekor: ", error);
      }
    } else {
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

  const handleAddToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <div className="bg-dark">
      <h2 className=" bg-dark">Kategóriák</h2>
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

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3 bg-dark">
        {products.map((product) => (
          <div className="col" key={product.id}>
            <div className="card product-card">
              <div className="product-image-container">
                <img
                  src={product.picture}
                  alt={product.name}
                  onClick={() => handleProductClick(product.id)}
                />
              </div>
              <div className="card-body">
                <h5>{product.name}</h5>
                <p>{product.price} Ft</p>
                <button className="add-to-cart" onClick={() => handleAddToCart(product)}>
                  Kosárba
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductBrowser;
