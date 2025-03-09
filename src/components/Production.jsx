import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
    const [productsData, setProductsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:7012/api/Products')
                setProductsData(response.data);
            } catch (error) {
                console.error("Hiba az adatok leklérésekor: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <div className="col">
                <div className="card shadow-sm">
                    <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                    <div className="card-body">
                        <p className="card-text">
                            {productsData.map(product => (
                                <div key={product.id}>
                                    {product.name} - {product.price} Ft.
                                </div>                                
                            ))}
                            This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <div className="d-flex justify-content-between align-items-center">                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;