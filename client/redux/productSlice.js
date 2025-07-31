import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Fetch
    fetchProducts: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
    fetchProductsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Add
    addProduct: (state) => {
      state.loading = true;
      state.error = null;
    },
    addProductSuccess: (state, action) => {
      state.items.push(action.payload);
      state.loading = false;
    },
    addProductFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Update
    updateProduct: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateProductSuccess: (state, action) => {
      const index = state.items.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index !== -1) state.items[index] = action.payload;
      state.loading = false;
    },
    updateProductFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Delete
    deleteProduct: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteProductSuccess: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      state.loading = false;
      state.error = null;
    },

    deleteProductFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchProducts,
  fetchProductsSuccess,
  fetchProductsFailure,
  addProduct,
  addProductSuccess,
  addProductFailure,
  updateProduct,
  updateProductSuccess,
  updateProductFailure,
  deleteProduct,
  deleteProductSuccess,
  deleteProductFailure,
} = productSlice.actions;

export default productSlice.reducer;
