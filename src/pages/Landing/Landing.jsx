import React, { useEffect, useLayoutEffect, useState } from "react";
import Login from "../../components/login/Login";
import Signup from "../../components/signup/Signup";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setMessage, setSuccess } from "../../redux/reducers/userSlice";

export default function Landing() {
  const location = useLocation();
  console.log(location);
  const [LoginTab, setLoginTab] = useState(true);
  const { user, loading, message } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      user.role == "ROLE_ADMIN"
        ? navigate("/admin/dashboard")
        : navigate("/user/home");
    } else {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    if (message) {
      toast.success(message, { pauseOnHover: false });
      dispatch(setMessage(null));
      setLoginTab(true);
    }
  }, [message]);
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
        <div className="bg-white h-[730px] w-[40%] rounded-xl shadow-black drop-shadow-2xl border border-gray-500">
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
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
    </>
  );
}
