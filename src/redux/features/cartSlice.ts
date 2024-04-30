import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../models/CartItem";
import { CartSlice } from "../../models/CartSlice";

// Load cart items and cart open from local storage
const persistedCartItems = localStorage.getItem("cartItems");
const persistedCartOpen = localStorage.getItem("cartOpen");

const initialState: CartSlice = {
  cartOpen: persistedCartOpen ? JSON.parse(persistedCartOpen) : false,
  cartItems: persistedCartItems ? JSON.parse(persistedCartItems) : [],
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { cartItems } = state;
      let updatedItems;
      if (cartItems.findIndex((pro) => pro._id === action.payload._id) === -1) {
        const item = { ...action.payload, quantity: 1 };
        updatedItems = [...cartItems, item];
      } else {
        updatedItems = cartItems.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity && item.quantity + 1 }
            : item
        );
      }
      // Save to local storage
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return { ...state, cartItems: updatedItems };
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const { cartItems } = state;
      const updatedItems = cartItems.filter(
        (item) => item._id !== action.payload
      );
      // Save to local storage
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return { ...state, cartItems: updatedItems };
    },
    reduceFromCart: (state, action: PayloadAction<string>) => {
      const { cartItems } = state;
      const _item = cartItems.find((item) => item._id === action.payload);
      let updatedItems;
      if (_item?.quantity && _item?.quantity > 1) {
        updatedItems = cartItems.map((item) =>
          item._id === action.payload
            ? { ...item, quantity: item.quantity && item.quantity - 1 }
            : item
        );
      } else {
        updatedItems = cartItems.filter((item) => item._id !== action.payload);
      }
      // Save to local storage
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return { ...state, cartItems: updatedItems };
    },
    setCartState: (state, action: PayloadAction<boolean>) => {
      localStorage.setItem("cartOpen", JSON.stringify(action.payload));
      return { ...state, cartOpen: action.payload };
    },
    emptyCart: (state) => {
      // Clear local storage
      localStorage.removeItem("cartItems");
      return { ...state, cartItems: [] };
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  setCartState,
  reduceFromCart,
  emptyCart,
} = cartSlice.actions;
export default cartSlice.reducer;
