// import UserContext from "../../contexts/UserContext";
import { useCookies } from "react-cookie";
import axios from "axios";
import { FaKey, FaUser } from "react-icons/fa";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSelect } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../redux/actions/userActions";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useLayoutEffect(() => {
    if (user) {
      user.role == "ADMIN"
        ? navigate("/admin/dashboard")
        : navigate("/user/home");
    }
  }, [user]);
  function loginButtonHandler() {
    let userCredentials = {
      username,
      password,
    };
    dispatch(userLogin(userCredentials));
  }
  return (
    <>
      <div className="flex justify-center font-bold text-xl mt-5">Hey</div>
      {error ? (
        <div className="font-bold text-red-700 text-center">
          Username or passowrd is invalid
        </div>
      ) : (
        ""
      )}
      <div className="w-full flex flex-col items-center gap-5 justify-center mt-12">
        <div className="flex flex-col">
          <label>Username</label>
          <div className="flex align-middle">
            <span className="pt-3 absolute ps-3">
              <FaUser />
            </span>
            <input
              type="text"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              className="border-black border rounded-md h-10 w-96 px-10"
            ></input>
          </div>
        </div>
        <div className="flex flex-col">
          <label>Password</label>
          <div className="flex align-middle">
            <span className="pt-3 absolute ps-3">
              <FaKey />
            </span>
            <input
              type="text"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              className="border-black border rounded-md h-10 w-96 px-10"
            ></input>
          </div>
        </div>
        <div className="mt-12">
          <button
            className="bg-teal-500 text-white w-28 h-9 text-lg font-bold rounded-lg"
            onClick={loginButtonHandler}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
