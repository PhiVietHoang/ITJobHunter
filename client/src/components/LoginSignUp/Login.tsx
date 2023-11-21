import React, { useEffect, useState } from "react";
import LoginImg from "../../assets/login-welcome2.png";
import Loader from "../Loader";
import { loginPageConstants } from "../../Constants/LoginConstants";
import { useDispatch, useSelector } from "react-redux";
import { FaUser, FaUserShield } from "react-icons/fa";
import { clearErrors, login } from "../../Actions/UserSignUp";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  //hooks and controls
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // date from state
  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  //user data
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  //result message
  const [message, setMessage] = useState("");
  const [messageT, setMessageT] = useState("");

  // message
  useEffect(() => {
    setTimeout(() => {
      setMessage("");
      dispatch(clearErrors());
    }, 5000);
  }, [message]);

  useEffect(() => {
    if (error) {
      setMessageT("text-red-500 font-bold");
      setMessage(error);
    }
  }, []);

  // HandleSLogin
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
    setLoginEmail("");
    setLoginPassword("");
  };

  //set message
  useEffect(() => {
    if (isAuthenticated) {
      setMessageT("text-green-500 font-bold");
      setMessage("Login Successfully");
      if (user.role === "admin" || user.role === "company") {
        navigate("/profile");
      } else if (user.role === "engineer") {
        navigate("/engineer");
      } else if (user.role === "student") {
        navigate("/home");
      }
    }
  }, [dispatch, user, isAuthenticated]);

  //function
  const handleSetDemoStudent = () => {
    //preset Users
    const demoStudent = {
      email: "demoUser@gmail.com",
      password: "demoUser@123",
    };
    setLoginEmail(demoStudent.email);
    setLoginPassword(demoStudent.password);
  };

  const handleSetDemoAdmin = () => {
    const demoAdmin = {
      email: "ADMIN_EMAIL@gmail.com",
      password: "ADMIN_PASSWORD",
    };
    setLoginEmail(demoAdmin.email);
    setLoginPassword(demoAdmin.password);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div
          className={`relative pt-[100px] lg:w-[1128px] w-full mx-auto flex items-start justify-around px-3`}
        >
          <div className="card hidden lg:w-[300px] lg:block p-[2rem]">
            <img src={LoginImg} alt="Login_Img" className="w-[80%] mx-auto" />
            <p className="font-bold text-lg my-2">New to Naukri?</p>
            <ul className="list list-decimal px-5 text-sm mb-2">
              {loginPageConstants &&
                loginPageConstants.map((ele, i) => (
                  <li key={i} className="mb-2">
                    {ele}
                  </li>
                ))}
            </ul>
            <button
              type="button"
              className="text-center mx-auto outline-1 outline outline-cyan-600 text-cyan-600 w-full h-8 hover:bg-cyan-600 hover:text-white hover:outline-white text-sm  duration-300 transition-all ease"
              onClick={() => handleClick()}
            >
              Register For Free
            </button>
          </div>
          <div className="card w-[500px]  mb-12">
            <form className=" w-full" onSubmit={loginSubmit}>
              <p className="text-xl md:text-2xl mb-5 pt-5">Login</p>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-90"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="name@mail.com"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your password
                </label>
                <input
                  type="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="*****************"
                  required
                  name="password"
                  aria-describedby="forgot-password-helper"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <p
                  id="forgot-password-helper"
                  className="mt-2 text-sm text-gray-500 flex items-end justify-end"
                >
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:underline "
                  >
                    Forgot Password
                  </a>
                  .
                </p>
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>

              <div className="flex justify-between gap-4 mt-8">
                <div
                  className="bg-gray-100 p-3 rounded-lg shadow-md w-1/2 cursor-pointer"
                  onClick={() => handleSetDemoStudent()}
                  title="Click to see the demo student details"
                >
                  <h3 className="flex items-center text-lg mb-2">
                    <FaUser className="mr-2" /> Student Details
                  </h3>
                  <p>
                    <strong>Email:</strong> demoUser@gmail.com
                  </p>
                  <p>
                    <strong>Password:</strong> demoUser@123
                  </p>
                </div>
                <div
                  className="bg-gray-100 p-3 rounded-lg shadow-md w-1/2 cursor-pointer"
                  onClick={() => handleSetDemoAdmin()}
                  title="Click to see the demo admin details"
                >
                  <h3 className="flex items-center text-lg mb-2">
                    <FaUserShield className="mr-2" /> Admin Details
                  </h3>
                  <p>
                    <strong>Email:</strong> ADMIN_EMAIL@gmail.com
                  </p>
                  <p>
                    <strong>Password:</strong> ADMIN_PASSWORD
                  </p>
                </div>
              </div>

              <p className={`text-center h-[20px] py-5 ${messageT}`}>
                {message}
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
