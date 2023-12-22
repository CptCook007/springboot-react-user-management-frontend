import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Landing from "./pages/Landing/Landing";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
function App() {
  const { user } = useSelector((state) => state.user);
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
  return (
    <>
      {user && <Navbar />}
      <Routes>
        <Route
          path="*"
          element={
            <h1 className="font-bold text-3xl flex justify-center  h-screen items-center">
              <div>No Page Found</div>
            </h1>
          }
        ></Route>
        {user ? (
          user.role == "ROLE_ADMIN" ? (
            <Route path="/admin/dashboard" element={<Dashboard />}></Route>
          ) : (
            <Route path="/user/home" element={<Home />}></Route>
          )
        ) : (
          <Route path="/" element={<Landing />}></Route>
        )}
      </Routes>
    </>
  );
}

export default App;
