import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchProducts: (state) => {
      state.loading = true;
    },
    fetchProductsSuccess: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
    fetchProductsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // Thêm các action cho add, update, delete nếu cần
  },
});

export const { fetchProducts, fetchProductsSuccess, fetchProductsFailure } =
  productSlice.actions;

export default productSlice.reducer;
