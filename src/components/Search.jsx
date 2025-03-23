import React, { useEffect, useState } from "react";
import axios from "axios";

const CategoryMenu = () => {
    const [categoriesData, setCategoriesData] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    //Kategóriák lekérdezése
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://localhost:7012/api/Categories')
                setCategoriesData(response.data);
            } catch (error) {
                console.error("Hiba az adatok lekérésekor: ", error);
            }
        }

        fetchCategories();  
    }, []);

    //Kiválasztott kategóriához tartozó termékek lekérdezése
    const handleCategoryChange = async (categoryId) => {
        setSelectedCategory(categoryId);

            try {
                const response = await axios.get(`https://localhost:7012/api/Products/${categoryId}`)
                setProducts(response.data);
            } catch (error) {
                console.error("Hiba az adatok lekérésekor: ", error);
            }}

        return (
            <div>                
                <h1 className="h1-modify">Kategóriák</h1>
                <select 
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}>
                    <option>Válassz...</option>
                    {categoriesData.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.categoryName}
                        </option>
                    ))}
                </select>

                {setCategoriesData && (
                    <div>
                        <h2 className="h2-modify">Termékek a(z) {categoriesData.find(c => c.id === +selectedCategory)?.categoryName} kategóriából:</h2>
                        <ul>
                            {products.map((products) => (
                                <li key={products.id}> 
                                <h3>{products.name}</h3>
                                Ár: {products.price} Ft
                                </li>                                
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    }

export default CategoryMenu;