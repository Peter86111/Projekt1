import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () =>
{
    const [productsData, setProductsData] = useState([]);

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            try
            {
                const response = await axios.get('https://localhost:7012/api/Products')
                setProductsData(response.data.result);
            } catch (error)
            {
                console.error("Hiba az adatok leklérésekor: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {productsData.length > 0 ? (
                productsData.map(product => (
                    <div className="col" key={product.id}>
                        <div className="card shadow-sm">
                            <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
                                <title>Placeholder</title>
                                <rect width="100%" height="100%" fill="#55595c" />
                                <text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
                            </svg>
                            <div className="card-body">
                                <p className="card-text">
                                    {product.name} - {product.price} Ft.
                                </p>
                                <div className="d-flex justify-content-between align-items-center">
                                    {/* Ide lehet gombokat vagy egyéb funkciókat tenni */}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center w-100">Nincsenek elérhető termékek.</p>
            )}
        </div>
    );

};

export default ProductList;