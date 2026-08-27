import { configureStore } from "@reduxjs/toolkit";
import authReaducer from "../features/auth/authSlice"
import cartReducer from "../features/cart/cartSlice"
import productReducer from "../features/products/productSlice"
const store = configureStore({
    reducer: {
        auth: authReaducer,
        cart: cartReducer,
        products: productReducer,
    }
})

export default store;