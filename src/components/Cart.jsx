import React from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, dispatch } = useCart();

  // Increase quantity of a specific product
  const handleIncreaseQuantity = (productId) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: productId });
  };

  // Decrease quantity of a specific product
  const handleDecreaseQuantity = (productId) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: productId });
  };

  // Remove a product entirely from the cart
  const handleRemoveFromCart = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  };

  // Clear the entire cart
  const handleClearCart = () => {
    localStorage.removeItem("cart");
    dispatch({ type: "CLEAR_CART" });
  };

  // Handle placing an order
  const handleOrder = () => {
    if (cart.length === 0) {
      alert("A kosár üres, nem lehet megrendelni.");
      return;
    }
    alert("Megrendelés sikeresen leadva!");
    dispatch({ type: "CLEAR_CART" });
  };

  // Calculate total price of all cart items
  const calculateTotalPrice = () => {
    return cart
      .reduce(
        (total, item) =>
          total + (Number(item.price) || 0) * (Number(item.quantity) || 0),
        0
      )
      .toFixed(2);
  };

  return (
    <div className="container-fluid py-5 bg-dark text-light min-vh-100">
      <div className="mx-auto" style={{ maxWidth: "960px" }}>
        <h2 className="mb-4 text-center">Kosár</h2>

        {/* Clear cart button */}
        <div className="d-flex justify-content-end mb-4">
          <button
            className="btn bg-danger text-white px-4 py-2 rounded mb-3"
            onClick={handleClearCart}
          >
            Kosár ürítése
          </button>
        </div>

        {/* If cart is empty */}
        {cart.length === 0 ? (
          <p className="text-center">A kosár üres</p>
        ) : (
          // List all cart items
          cart.map((item) => (
            <div
              className="d-flex justify-content-between align-items-center bg-secondary text-light p-3 rounded shadow-sm mb-3"
              key={item.id}
            >
              {/* Product details and quantity */}
              <div className="d-flex align-items-center">
                <img
                  src={item.picture}
                  alt={item.name}
                  className="rounded mr-3"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <div className="ms-4">
                  <p className="font-weight-bold">{item.name}</p>
                  <p className="text-light">{item.price} Ft</p>

                  {/* Quantity controls */}
                  <div className="quantity-container text-light">
                    Mennyiség:
                    <button
                      className="btn-custom-red"
                      onClick={() => handleDecreaseQuantity(item.id)}
                      aria-label="Decrease Quantity"
                    >
                      <i className="bi bi-dash-lg"></i>
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      className="btn-custom-green"
                      onClick={() => handleIncreaseQuantity(item.id)}
                      aria-label="Increase Quantity"
                    >
                      <i className="bi bi-plus-lg"></i>
                    </button>
                  </div>
                </div>
              </div>

              {/* Remove button */}
              <div className="trash-button">
                <button
                  className="btn-custom-red"
                  onClick={() => handleRemoveFromCart(item.id)}
                  aria-label="Remove from Cart"
                >
                  <i className="bi bi-trash fs-5"></i>
                </button>
              </div>
            </div>
          ))
        )}

        {/* Total and Order section */}
        <div className="mt-4 text-end">
          <h3>Összesen: {calculateTotalPrice()} Ft</h3>
          <button
            className="btn btn-outline-light px-4 py-2 mt-2"
            onClick={handleOrder}
          >
            Megrendelés
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
