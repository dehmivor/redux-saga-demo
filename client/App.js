import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import ProductList from "./ProductList";

export default function App() {
  return (
    <Provider store={store}>
      <ProductList />
    </Provider>
  );
}
