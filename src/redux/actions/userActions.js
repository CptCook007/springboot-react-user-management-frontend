import instance from "../../config/axiosConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await instance.post(
        "/auth/login",
        userCredentials,
        config
      );
      const data = response.data;
      const decodedJwt = jwtDecode(data.accessToken);
      Cookies.set("userToken", data.accessToken);
      return {
        username: decodedJwt.sub,
        role: decodedJwt.role,
      };
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status) {
        return rejectWithValue(error.response.status);
      } else {
        return rejectWithValue(
          "An error occurred while processing your request."
        );
      }
    }
  }
);

export const userRegister = createAsyncThunk(
  "user/userRegister",
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await instance.post(`/auth/register`, userData, config);
      console.log(response);
      if (response && response.data && response.data.error) {
        return rejectWithValue(response.data.error);
      }
    } catch (error) {
      console.log(error);
      if (error.response.data) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(
          "An error occurred while processing your request."
        );
      }
    }
  }
);
