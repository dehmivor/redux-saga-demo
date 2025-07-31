import { combineReducers } from "redux";
import productReducer from "./productSlice";

const rootReducer = combineReducers({
  products: productReducer,
});

export default rootReducer;
