import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Kosár kezelése

const ProductSinglePage = () => {
    const { dispatch } = useCart(); // Kosárba történő hozzáadás funkció
    const params = useParams();
    const id = params.productId; // URL paraméterből a 'productId'
    const [product, setProduct] = useState(null);
    const [isPending, setPending] = useState(true);

    useEffect(() => {
        setPending(true);
        (async () => {
            try {
                const res = await fetch(`https://localhost:7012/api/Products/ById?id=${id}`);
                const productData = await res.json();
                setProduct(productData.result); // A termék adatainak beállítása
            } catch (error) {
                console.log(error);
            } finally {
                setPending(false);
            }
        })();
    }, [id]);

    // Kosárba helyezés funkció
    const handleAddToCart = () => {
        if (product) {
            dispatch({ type: "ADD_TO_CART", payload: product });
        }
    };

    return (
        <div className="container p-5 m-auto text-center bg-light shadow-lg rounded">
            {isPending || !product ? (
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            ) : (
                    <div className="card-body">
  <div className="row">
    <div className="col-md-6 d-flex justify-content-center align-items-center">
      <img
        src={product.picture}
        alt={product.name}
        className="img-fluid rounded shadow-sm"
        style={{ maxHeight: 350, objectFit: 'contain' }}
      />
    </div>
    <div className="col-md-6 d-flex flex-column justify-content-center">
    <h4 className="card-title text-dark mt-2">{product.name}</h4>
      <p className="lead text-muted">Ár: {product.price} Ft</p>
      <p className="text-secondary">{product.description}</p>
      <div className="mt-3">
        <button 
          className="add-to-cart"
          onClick={() => handleAddToCart(product)} >
          Kosárba
        </button>
      </div>
    </div>
    </div>
            
                    <div className="card-footer text-muted mt-4">
                        <NavLink to="/termekek" className="btn btn-secondary">
                            <i className="bi bi-arrow-left-circle"></i> Vissza
                        </NavLink>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductSinglePage;


