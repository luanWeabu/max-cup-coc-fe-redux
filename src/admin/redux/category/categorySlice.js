import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categorys: [
    {
      id: 1,
      name: "Cốc",
    },
  ],
};

const categorySlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    selectCategoryById: (state, categoryId) => {
      return state.categorys.find((category) => category.id === categoryId);
    },
  },
});

export const { selectCategoryById } = categorySlice.actions;
export default categorySlice.reducer;
