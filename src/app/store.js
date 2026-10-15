import { configureStore } from "@reduxjs/toolkit";
import authReaducer from "../features/auth/authSlice"
import cartReducer from "../features/cart/cartSlice"
import productReducer from "../features/products/productSlice"
import orderReducer from "../features/orders/orderSlice"
const store = configureStore({
    reducer: {
        auth: authReaducer,
        cart: cartReducer,
        products: productReducer,
        orders: orderReducer,
    }
})

export default store;