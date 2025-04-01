import React from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, dispatch } = useCart();

  const handleIncreaseQuantity = (productId) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: productId });
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: productId });
  };

  const handleRemoveFromCart = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <h2>Kosár</h2>
      {cart.length === 0 ? (
        <p>A kosár üres</p>
      ) : (
        cart.map((item) => (
        
         
          <div className="box" key={item.id}>
          {/* Bal oldal: Terméknév és mennyiség egy oszlopban */}
          <div className="left-section">
            <p className="product-name">
              {item.name} - {item.price} Ft
            </p>
        
            {/* Mennyiség közvetlenül a név alatt indul */}
            <div className="quantity-container"> Mennyiség:
              <button className="btn-custom-red" onClick={() => handleDecreaseQuantity(item.id)}>
                <i className="bi bi-dash-lg"></i>
              </button>
              <span className="quantity-value">{item.quantity}</span> 
              <button className="btn-custom-green" onClick={() => handleIncreaseQuantity(item.id)}>
                <i className="bi bi-plus-lg"></i>
              </button>
            </div>
          </div>
        
          {/* Jobb oldal: Kuka gomb */}
          <div className="trash-button">
            <button className="btn-custom-red" onClick={() => handleRemoveFromCart(item.id)}>
              <i className="bi bi-trash fs-5"></i>
            </button>
          </div>
        </div>
        
        ))
      )}
      <div>
        <h3>Összesen: {calculateTotalPrice()} Ft</h3>
      </div>
    </div>
  );
};

export default Cart;






