import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  fetchProducts,
  fetchProductsSuccess,
  fetchProductsFailure,
} from "./productSlice";

function* fetchProductsSaga() {
  try {
    const res = yield call(axios.get, "http://localhost:3000/products");
    yield put(fetchProductsSuccess(res.data));
  } catch (e) {
    yield put(fetchProductsFailure(e.message));
  }
}

export default function* productSaga() {
  yield takeLatest(fetchProducts.type, fetchProductsSaga);
}
