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

  const handleClearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const handleOrder = () => {
    if (cart.length === 0) {
      alert("A kosár üres, nem lehet megrendelni.");
      return;
    }
    alert("Megrendelés sikeresen leadva!");
    dispatch({ type: "CLEAR_CART" });
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + (Number(item.price) || 0) * (Number(item.quantity) || 0), 0).toFixed(2);
  };

  return (
    <div>
      <h2 className="mb-4">Kosár</h2>

      <div className="d-flex justify-content-end mb-4">
        <button className="btn bg-danger text-white px-4 py-2 rounded mb-3" onClick={handleClearCart}>
          Kosár ürítése
        </button>
      </div>
      {cart.length === 0 ? (
        <p>A kosár üres</p>
      ) : (
        cart.map((item) => (
          <div className="d-flex justify-content-between align-items-center bg-white p-1 rounded shadow-sm mb-3" key={item.id}>
           <div className="d-flex align-items-center">
              <img src={item.picture} alt={item.name} className="w-25 h-25 object-cover rounded mr-2" />
              <div>
                <p className="font-weight-bold">{item.name}</p>
                <p className="text-muted">{item.price} Ft</p>
                <div className="quantity-container">
                  Mennyiség:
                  <button className="btn-custom-red" onClick={() => handleDecreaseQuantity(item.id)} aria-label="Decrease Quantity">
                    <i className="bi bi-dash-lg"></i>
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button className="btn-custom-green" onClick={() => handleIncreaseQuantity(item.id)} aria-label="Increase Quantity">
                    <i className="bi bi-plus-lg"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="trash-button">
              <button className="btn-custom-red" onClick={() => handleRemoveFromCart(item.id)} aria-label="Remove from Cart">
                <i className="bi bi-trash fs-5"></i>
              </button>
            </div>
          </div>
        ))
      )}
      <div>
        <h3>Összesen: {calculateTotalPrice()} Ft</h3>
        <button className="bg-dark px-4 py-2 rounded mb-3" onClick={handleOrder}>Megrendelés</button>
      </div>
    </div>
  );
};

export default Cart;







