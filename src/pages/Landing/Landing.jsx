import React, { useState } from "react";
import Login from "../../components/login/Login";
import Signup from "../../components/signup/Signup";
import { useSelector } from "react-redux";

export default function Landing() {
  const [LoginTab, setLoginTab] = useState(true);
  const { loading } = useSelector((state) => state.user);
  return (
    <>
      {loading ? (
        <div className="fixed inset-0 z-40 bg-black/30 h-screen w-screen flex justify-center items-center">
          <div class="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        ""
      )}
      <div className="h-screen flex justify-center items-center bg-slate-300">
        <div className="bg-white h-[80%] w-[40%] rounded-xl shadow-black drop-shadow-2xl border border-gray-500">
          <div className="w-full h-16">
            <button
              className={`w-[50%] h-full duration-200 font-bold text-xl transition-colors ease-linear rounded-tl-xl border-gray-600 ${
                LoginTab ? "bg-teal-400 text-white" : ""
              }`}
              onClick={() => setLoginTab(true)}
            >
              Login
            </button>
            <button
              className={`w-[50%] h-16 duration-200 font-bold text-xl transition-colors ease-linear rounded-tr-xl  border-gray-600 ${
                LoginTab ? "" : "bg-teal-400 text-white"
              }`}
              onClick={() => setLoginTab(false)}
            >
              Signup
            </button>
          </div>
          <div className="pt-5 w-full h-full rounded-xl rounded-t-none">
            {LoginTab ? <Login /> : <Signup />}
          </div>
        </div>
      </div>
    </>
  );
}
