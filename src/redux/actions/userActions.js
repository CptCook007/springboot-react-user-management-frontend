import instance from "../../config/axiosConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (userCredentials) => {
    try {
      const { data } = await axios.post(
        `/auth/login`,
        JSON.stringify(userCredentials)
      );
      Cookies.set("userToken", data.accessToken);
      const decodedJwt = jwtDecode(data.accessToken);
      return {
        username: decodedJwt.sub,
        role: decodedJwt.role,
      };
    } catch (error) {
      if (error.response && error.response.data.error) {
        console.log(error.response.data.error);
        // return rejectWithValue(error.response.data.error);
        return;
      } else {
        return;
      }
    }
  }
);
