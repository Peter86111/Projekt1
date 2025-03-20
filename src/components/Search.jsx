import React, { useEffect, useState } from "react";
import axios from "axios";
import { ListGroup, Nav } from "react-bootstrap";
import ProductList from "./Production";

const SearchList = () => {
    const [categorysData, setCategoriesData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:7012/api/Categories')
                setCategoriesData(response.data);
            } catch (error) {
                console.error("Hiba az adatok leklérésekor: ", error);
            }
        };

        fetchData();
    }, []);

    return (      
        <ListGroup>Szűrés          
        <select>
        <option>Válassz kategóriát</option>
            {categorysData.map(category => (
                <option key={category.id}>
                    <p>{category.categoryName}</p>
                </option>
            ))}
        </select>
        </ListGroup>

    );
};
export default SearchList;