import React from "react";
import { FiSettings } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Home() {
  const { loading } = useSelector((state) => state.user);
  return (
    <div className="bg-gray-300 h-screen">
      {loading ? (
        <div className="fixed inset-0 z-50 bg-black/30 h-screen w-screen flex justify-center items-center">
          <div class="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        ""
      )}
      <div className="h-[70%]">
        <div className="flex justify-center items-center h-[100%]">
          <Link to="profile-settings">
            <button className="flex justify-center items-center h-16 w-52  gap-2 rounded text-white font-bold text-xl bg-cyan-700">
              <FiSettings />
              Profile Settings
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
