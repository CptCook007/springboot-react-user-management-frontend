import { FaKey, FaUser } from "react-icons/fa";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, ErrorMessage, Field } from "formik";
import InputComponent from "../inputs/InputComponent";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../redux/actions/userActions";
function Login() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required").matches(),
  });
  function handleLoginSubmit(userCredentials) {
    console.log(userCredentials);
    dispatch(userLogin(userCredentials));
  }
  return (
    <>
      <div className="flex justify-center font-bold text-xl mt-5">Hey</div>
      {error && error === 400 && (
        <div className="font-bold text-red-700 text-center">
          Username or password is invalid
        </div>
      )}
      <Formik
        initialValues={initialValues}
        onSubmit={handleLoginSubmit}
        validationSchema={validationSchema}
      >
        <Form className="w-full flex flex-col items-center gap-5 justify-center mt-12">
          <InputComponent name="username" title="Username" icon={<FaUser />} />
          <InputComponent name="password" title="Password" icon={<FaKey />} />
          <div className="mt-12">
            <button
              type="submit"
              className="bg-teal-500 text-white w-28 h-9 text-lg font-bold rounded-lg"
            >
              Login
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default Login;
