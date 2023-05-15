import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  variants: [{
    id: 1,
    type: "Cốc gốm"
  }]
}

const variantSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {},
});

export const { todoAdded, todoToggled } = variantSlice.actions;
export default variantSlice.reducer;
