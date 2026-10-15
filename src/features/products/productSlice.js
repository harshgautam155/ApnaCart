import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getAllProducts, getProductById} from "../../api/productApi";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params, thunkAPI) => {
    // params: { keyword, category, pageNumber } — whatever your GET /products supports as query params
    try {
      const res = await getAllProducts(params);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch products",
      );
    }
  },
);

export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id, thunkAPI) => {
    try {
      const res = await getProductById(id);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch product",
      );
    }
  },
);

// ---- Slice ----

const initialState = {
  products: [],
  product: null, // single product, for ProductDetailsPage
  status: "idle",
  detailsStatus: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProductError: (state) => {
      state.error = null;
    },
    clearSelectedProduct: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch product list
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.data || action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Fetch single product
      .addCase(fetchProductDetails.pending, (state) => {
        state.detailsStatus = "loading";
        state.error = null;
        state.product = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.detailsStatus = "succeeded";
        state.product = action.payload.data || action.payload.product || action.payload.products || action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.detailsStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearProductError, clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;