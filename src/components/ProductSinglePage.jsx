import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Kosár kezelése

const ProductSinglePage = () => {
    const { dispatch } = useCart();
    const params = useParams();
    const id = params.productId;
    const [product, setProduct] = useState(null);
    const [isPending, setPending] = useState(true);

    useEffect(() => {
        setPending(true);
        (async () => {
            try {
                const res = await fetch(`https://localhost:7012/api/Products/ById?id=${id}`);
                const productData = await res.json();
                setProduct(productData.result);
            } catch (error) {
                console.log(error);
            } finally {
                setPending(false);
            }
        })();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            dispatch({ type: "ADD_TO_CART", payload: product });
        }
    };

    return (
        <div className="container-fluid p-5 text-center bg-dark text-light shadow-lg rounded" style={{ minHeight: "100vh" }}>
            {isPending || !product ? (
                <div className="spinner-border text-light" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            ) : (
                <div className="card-body bg-dark text-light rounded mx-auto" style={{ maxWidth: "1400px" }}>
                    <div className="row w-100 px-4 mx-auto">
                        <div className="col-md-6 d-flex justify-content-center align-items-center mb-4">
                            <img
                                src={product.picture}
                                alt={product.name}
                                className="img-fluid rounded shadow-sm"
                                style={{ maxHeight: 400, objectFit: 'contain', width: '100%' }}
                            />
                        </div>
                        <div className="col-md-6 d-flex flex-column justify-content-center">
                            <h4 className="card-title text-light mt-2">{product.name}</h4>
                            <p className="lead text-light">Ár: {product.price} Ft</p>
                            <p className="text-light">{product.description}</p>
                            <div className="mt-3">
                                <button 
                                    className="btn btn-outline-light"
                                    onClick={() => handleAddToCart(product)} >
                                    Kosárba
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Elválasztó vonal */}
                    <div className="card-footer mt-4 border-top border-secondary bg-dark"></div>

                    {/* Vissza gomb a vonal alatt */}
                    <div className="text-center mt-3">
                        <NavLink to="/termekek" className="btn btn-outline-light">
                            <i className="bi bi-arrow-left-circle"></i> Vissza
                        </NavLink>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductSinglePage;