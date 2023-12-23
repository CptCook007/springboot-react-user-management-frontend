import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Landing from "./pages/Landing/Landing";
import Home from "./pages/user/Home/Home";
import Dashboard from "./pages/admin/Dashboard/Dashboard";
import ProfileSettings from "./pages/user/Home/ProfileSettings";
import NetworkStatusChecker from "./components/NetworkStatusChecker";
function App() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);
  return (
    <>
      <NetworkStatusChecker />
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
            <>
              <Route
                path="/user/home/profile-settings"
                element={<ProfileSettings />}
              ></Route>
              <Route path="/user/home" element={<Home />}></Route>
            </>
          )
        ) : (
          <></>
        )}
        <Route path="/" element={<Landing />}></Route>
      </Routes>
    </>
  );
}

export default App;
