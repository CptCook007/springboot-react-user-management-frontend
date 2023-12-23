import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { json } from "react-router-dom";
import { FiPower, FiSettings } from "react-icons/fi";
import { logout } from "../redux/reducers/userSlice";
export default function Navbar() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const logoutButtonhandler = () => {
    dispatch(logout());
  };
  return (
    <>
      <nav className="flex justify-end w-[100%] h-20 px-8 py-5">
        <div>
          <button
            onClick={logoutButtonhandler}
            className="text-2xl font-bold bg-red-600 text-white h-12 w-12 rounded-full flex justify-center items-center"
          >
            <FiPower></FiPower>
          </button>
        </div>
      </nav>
    </>
  );
}
