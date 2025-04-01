import { createContext, useContext, useReducer, useEffect } from "react";

// Create Cart Context
const CartContext = createContext();

// Cart Reducer to handle the cart actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      // Check if the item already exists in the cart, and increase its quantity
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        // Increase the quantity of the existing item in the cart
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      // If the item is not in the cart, add it with a quantity of 1
      return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };

    case "REMOVE_FROM_CART":
      // Remove the item from the cart
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case "INCREASE_QUANTITY":
      // Increase the quantity of a specific item in the cart
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case "DECREASE_QUANTITY":
      // Decrease the quantity of a specific item in the cart, with a minimum quantity of 1
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };

    case "CLEAR_CART":
      // Clear all items in the cart
      return { ...state, cart: [] };

    case "SET_CART":
      // Set the cart items based on saved data (from localStorage)
      return { ...state, cart: action.payload };

    default:
      return state;
  }
};

// Cart Provider to wrap around components
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { cart: [] });

  // UseEffect to retrieve cart data from localStorage on initial load
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      dispatch({ type: "SET_CART", payload: savedCart });
    }
  }, []);

  // UseEffect to store cart data in localStorage whenever it changes
  useEffect(() => {
    if (state.cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(state.cart));
    }
  }, [state.cart]);

  return (
    <CartContext.Provider value={{ cart: state.cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the Cart context
export const useCart = () => useContext(CartContext);
