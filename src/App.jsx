import { useState } from "react";
import "./App.css";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Landing from "./pages/Landing/Landing";
function App() {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="*"
          element={
            <h1 className="font-bold text-3xl flex justify-center  h-screen items-center">
              <div>No Page Found</div>
            </h1>
          }
        ></Route>
        <Route path="/" element={<Landing />}></Route>
      </Routes>
    </>
  );
}

export default App;
