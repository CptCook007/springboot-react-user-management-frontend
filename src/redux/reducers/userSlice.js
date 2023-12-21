import { userLogin } from "../actions/userActions";
import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
const token = Cookies.get("userToken");
let user = null;
if (token) {
  const decoded = jwtDecode(token);
  const role = decoded.role;
  const username = decoded.sub;
  user = {
    username: username,
    role: role,
  };
}

const intialState = {
  loading: false,
  user: user,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: intialState,
  reducers: {
    logout: (state) => {
      Cookies.remove("userToken");
      state.loading = false;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error;
      });
  },
});
export const { logout } = userSlice.actions;
export default userSlice.reducer;
