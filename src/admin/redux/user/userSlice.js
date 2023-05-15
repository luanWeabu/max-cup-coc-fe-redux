import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUserId: null,
  userDetail: null,
  users: [
    {
      id: 1,
      name: "JohnSon",
      email: "johnson@gmail.com",
      age: 33,
      phone: "06661215454",
      access: "admin",
    },
    {
      id: 2,
      name: "Max lie",
      email: "maxlie12@gmail.com",
      age: 23,
      phone: "0913317626",
      access: "manager",
    },
    {
      id: 3,
      name: "Banh bao",
      email: "banhbao@gmail.com",
      age: 17,
      phone: "0933686893",
      access: "user",
    },
    {
      id: 4,
      name: "Banh mi",
      email: "banhmi@gmail.com",
      age: 27,
      phone: "0963743215",
      access: "user",
    },
    {
      id: 5,
      name: "Mì tôm",
      email: "mitom@gmail.com",
      age: 27,
      phone: "0963743265",
      access: "user",
    },
  ],
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUserId: (state, action) => {
      state.currentUserId = action.payload.currentUserId;
    },
    setUserDetail: (state) => {
      const id = state.currentUserId;
      const user = state.users.find((user) => user.id === id);
      state.userDetail = user;
    },
    updateUserById: (state, action) => {
      const { updatedUser } = action.payload;
      const index = state.users.findIndex((user) => user.id === updatedUser.id);

      if (index !== -1) {
        state.users = [
          ...state.users.slice(0, index),
          updatedUser,
          ...state.users.slice(index + 1),
        ];
      }
    },
    deleteUserById: (state, action) => {
      //lấy ra giá trị của UserId từ payload của action
      const { UserId } = action.payload;
      // tìm kiếm index của user trong mảng users trong state bằng cách so sánh giá trị id và UserId
      const index = state.users.findIndex((user) => user.id === UserId);
      // Nếu index id có tồn tại slice sẽ tạo ra một bản sao từ vị trí index được loại bỏ
      // khi hai mảng được tạo ra sẽ kết hợp lại , mảng mới này được gán lại cho users trong state
      if (index !== -1) {
        state.users = [
          ...state.users.slice(0, index),
          ...state.users.slice(index + 1),
        ];
      }
    },
    addUser(state, action) {
      const newId =
        state.users.length > 0 ? state.users[state.users.length - 1].id + 1 : 1;
      state.users = [
        ...state.users,
        { ...action.payload.addedUser, id: newId },
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCurrentUserId,
  setUserDetail,
  updateUserById,
  deleteUserById,
  addUser,
} = UserSlice.actions;

export default UserSlice.reducer;
