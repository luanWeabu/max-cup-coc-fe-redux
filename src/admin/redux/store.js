import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./product/productSlice";
import userReducer from "./user/userSlice";
import orderReducer from "./order/orderSlice";
import categoryReducer from "./category/categorySlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    order: orderReducer,
    category: categoryReducer,
  },
});

export default store;
