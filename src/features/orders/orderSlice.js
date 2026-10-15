import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
} from "../../api/orderApi";

// ---- Thunks ----

export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (orderData, thunkAPI) => {
    try {
      const res = await createOrder(orderData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to place order",
      );
    }
  },
);

export const fetchMyOrders = createAsyncThunk(
  "orders/fetchMyOrders",
  async (_, thunkAPI) => {
    try {
      const res = await getMyOrders();
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch your orders",
      );
    }
  },
);

export const fetchOrderDetails = createAsyncThunk(
  "orders/fetchOrderDetails",
  async (id, thunkAPI) => {
    try {
      const res = await getOrderById(id);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch order",
      );
    }
  },
);

export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAllOrders",
  async (_, thunkAPI) => {
    try {
      const res = await getAllOrders();
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders",
      );
    }
  },
);

// ---- Slice ----

const initialState = {
  order: null, // the just-placed or currently-viewed single order
  myOrders: [],
  allOrders: [], // admin only
  placeStatus: "idle",
  orderStatus: "idle",
  myOrdersStatus: "idle",
  allOrdersStatus: "idle",
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },
    clearCurrentOrder: (state) => {
      state.order = null;
      state.placeStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // Place order (checkout)
      .addCase(placeOrder.pending, (state) => {
        state.placeStatus = "loading";
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.placeStatus = "succeeded";
        state.order = action.payload.order || action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.placeStatus = "failed";
        state.error = action.payload;
      })

      // Fetch single order (order details / confirmation page)
      .addCase(fetchOrderDetails.pending, (state) => {
        state.orderStatus = "loading";
        state.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.orderStatus = "succeeded";
        state.order = action.payload.order || action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.orderStatus = "failed";
        state.error = action.payload;
      })

      // Fetch logged-in user's orders
      .addCase(fetchMyOrders.pending, (state) => {
        state.myOrdersStatus = "loading";
        state.error = null;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.myOrdersStatus = "succeeded";
        state.myOrders = action.payload.orders || action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.myOrdersStatus = "failed";
        state.error = action.payload;
      })

      // Fetch all orders (admin)
      .addCase(fetchAllOrders.pending, (state) => {
        state.allOrdersStatus = "loading";
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.allOrdersStatus = "succeeded";
        state.allOrders = action.payload.orders || action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.allOrdersStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearOrderError, clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;