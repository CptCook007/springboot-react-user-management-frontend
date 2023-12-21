import instance from "../../config/axiosConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (userCredentials) => {
    const { data } = await instance
      .post("/auth/login", userCredentials, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        const decodedJwt = jwtDecode(data.accessToken);
        // console.log("token : ", data.accessToken);
        // console.log("subject: ", decodedJwt.sub);
        // Cookies.set("userToken", data.accessToken);
        return {
          username: decodedJwt.sub,
          role: decodedJwt.role,
        };
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
