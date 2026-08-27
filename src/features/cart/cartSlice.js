import { createSlice } from "@reduxjs/toolkit";
import { loadCart, saveCart, clearCartStorage } from "../../utils/localStorage";

const initialState = loadCart();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.product === newItem.product,
      );
      if (existingItem) {
        existingItem.qty += Math.min(
          existingItem.qty + newItem.qty,
          existingItem.countInstock,
        );
      } else {
        state.items.push(newItem);
      }
      saveCart(state);
    },

    removeItem: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.product !== productId);
      saveCart(state);
    },

    updateQty: (state, action) => {
      const { product, qty } = action.payload;
      const item = state.items.find((item) => item.product === product);
      if (item) {
        item.qty = Math.max(1, Math.min(qty, item.countInstock));
      }
      saveCart(state);
    },

    clearCart: (state) => {
      state.items = [];
      clearCartStorage();
    },
  },
});

export const { addItem, removeItem, updateQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;