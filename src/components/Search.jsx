import React, { useEffect, useState } from "react";
import axios from "axios";

const CategoryMenu = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://localhost:7012/api/Categories');
        setCategoriesData(response.data);
      } catch (error) {
        console.error("Hiba az adatok lekérésekor: ", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products based on selected category
  const handleCategoryChange = async (event) => {
    const categoryId = parseInt(event.target.value, 10); // Convert string to number
    setSelectedCategory(categoryId);

    if (categoryId) {
      try {
        const response = await axios.get(`https://localhost:7012/api/Products/${categoryId}`);
        setProducts(response.data);
      } catch (error) {
        console.error("Hiba az adatok lekérésekor: ", error);
      }
    } else {
      setProducts([]); // Clear products if no category selected
    }
  };

  return (
    <div>
      <h1 className="h1-modify">Kategóriák</h1>

      {/* Dropdown to select category */}
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">Válassz...</option>
        {categoriesData.map(category => (
          <option key={category.id} value={category.id}>
            {category.name} {/* Display category name */}
          </option>
        ))}
      </select>

      {/* Display products from selected category */}
      <div>
        <h2>Termékek</h2>
        {products.length > 0 ? (
          <ul>
            {products.map(product => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>
        ) : (
          <p>Nincsenek termékek a kiválasztott kategóriában.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryMenu;
