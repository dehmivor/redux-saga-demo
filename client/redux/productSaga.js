import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
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
} from "./productSlice";

// Fetch
function* fetchProductsSaga() {
  try {
    const res = yield call(axios.get, "http://localhost:3000/products");
    yield put(fetchProductsSuccess(res.data));
  } catch (e) {
    yield put(fetchProductsFailure(e.message));
  }
}

// Add
function* addProductSaga(action) {
  try {
    const res = yield call(
      axios.post,
      "http://localhost:3000/products",
      action.payload
    );
    yield put(addProductSuccess(res.data));
  } catch (e) {
    yield put(addProductFailure(e.message));
  }
}

// Update
function* updateProductSaga(action) {
  try {
    const { _id, ...data } = action.payload;
    const res = yield call(
      axios.put,
      `http://localhost:3000/products/${_id}`,
      data
    );
    yield put(updateProductSuccess(res.data));
  } catch (e) {
    yield put(updateProductFailure(e.message));
  }
}

// Delete
function* deleteProductSaga(action) {
  try {
    yield call(
      axios.delete,
      `http://localhost:3000/products/${action.payload}`
    );
    yield put(deleteProductSuccess(action.payload));
  } catch (e) {
    yield put(deleteProductFailure(e.message));
  }
}

export default function* productSaga() {
  yield takeLatest(fetchProducts.type, fetchProductsSaga);
  yield takeLatest(addProduct.type, addProductSaga);
  yield takeLatest(updateProduct.type, updateProductSaga);
  yield takeLatest(deleteProduct.type, deleteProductSaga);
}
