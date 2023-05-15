import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { selectCategoryById } from "../category/categorySlice";

const initialState = {
  currentProductId: null,
  productDetail: null,
  products: [
    {
      id: 1,
      name: "Cốc thủy tinh Max",
      type: "thủy tinh",
      origin: "Vietnam",
      price: "685000",
      time: "23 - 09 - 2023",
    },
    {
      id: 2,
      name: "Cốc gốm Thái sơn ",
      type: "cốc gốm",
      origin: "Trung quốc",
      price: "350",
      time: "23 - 09 - 2023",
    },
    {
      id: 3,
      name: "Cốc Xứ Agentina",
      type: "cốc xứ",
      origin: "Argentina",
      price: "6400",
      time: "23 - 09 - 2023", //2023-
    },
    {
      id: 4,
      name: "Cốc Vàng Cổ 3 triệu năm",
      type: "Cốc ",
      origin: "Vietnam",
      price: "25000",
      time: "23 - 09 - 2023",
    },
    {
      id: 5,
      name: "Cốc giấy Sinh nhật",
      type: "Cốc giấy",
      origin: "Vietnam",
      price: "20",
      time: "23 - 09 - 2023",
    },
    {
      id: 6,
      name: "Cốc in hoa tiết cực đẹp",
      type: "Cốc",
      origin: "Châu âu",
      price: "320",
      time: "23 - 09 - 2023",
    },
  ],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCurrentProductId: (state, action) => {
      // action.payload = { currentProductId: productId }
      state.currentProductId = action.payload.currentProductId;
    },
    setProductDetail: (state) => {
      const id = state.currentProductId;
      const product = state.products.find((product) => product.id === id);
      state.productDetail = product;
    },
    updateProductById: (state, action) => {
      const { updatedProduct } = action.payload;
      const index = state.products.findIndex(
        (product) => product.id === updatedProduct.id
      );
      if (index !== -1) {
        //lấy sản phẩm theo từng index
        // return (state.products[index] = {
        //   //tạo ra sản phẩm bản sao sau đó ghi đè lên bằng updateProduct(giá trị truyền vào)
        //   ...state.products[index],
        //   ...updatedProduct,
        // });
        state.products = [
          ...state.products.slice(0, index), // bắt đầu từ 0 --> index nhưng không lấy thằng cuối (không lấy thằng state.products[index])
          updatedProduct,
          ...state.products.slice(index + 1), // bắt đầu từ start nhưng không lấy end
        ];
      }
    },
    deleteProductById: (state, action) => {
      const { productId } = action.payload;
      const index = state.products.findIndex(
        (product) => product.id === productId
      );
      if (index !== -1) {
        //lấy sản phẩm theo từng index
        // return (state.products[index] = {
        //   //tạo ra sản phẩm bản sao sau đó ghi đè lên bằng updateProduct(giá trị truyền vào)
        //   ...state.products[index],
        //   ...updatedProduct,
        // });
        state.products = [
          ...state.products.slice(0, index),
          ...state.products.slice(index + 1),
        ];
      }
    },
    // hàm thêm một sản phẩm vào danh sách các sản phẩm
    // thêm Product dựa theeo id hiện tại + 1
    addProduct(state, action) {
      const newId =
        state.products.length > 0
          ? state.products[state.products.length - 1].id + 1
          : 1;
      // lấy ra toàn bộ products hiện tại
      // truyền vào
      state.products = [
        ...state.products,
        { ...action.payload.addedProduct, id: newId },
      ];
    },
  },
});

// 1. Destructuring
// 2. Export
export const {
  setCurrentProductId,
  setProductDetail,
  updateProductById,
  deleteProductById,
  addProduct,
} = productSlice.actions; // { setCurrentProductId(currentProductId) }

export default productSlice.reducer;
