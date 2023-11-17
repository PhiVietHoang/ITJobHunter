import React, { useEffect, useState } from "react";
import WelcomeImg from "../../../assets/login-welcome.png";
// data
import {
  loginFooter,
  welcomeCheckList,
} from "../../../Constants/LoginConstants";
//icons
import SignUpFormCompany from "./SignUpFormCompany";
import SignUpStudent from "./SignUpStudent";
import Loader from "../../Loader";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  //navi
  const navigate = useNavigate();

  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const [isShowCompany, setIsShowCompany] = useState(false);

  // set sign up element
  const handelPartners = () => {
    setIsShowCompany(!isShowCompany);
  };

  useEffect(() => {
    // user is register
    if (isAuthenticated) {
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "engineer") {
        navigate("/engineer");
      } else if (user.role === "student") {
        navigate("/home");
      } else if (user.role === "company") {
        navigate("/profile");
      }
    }
  }, [isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div
          className={`relative pt-[100px] lg:w-[1128px] w-full mx-auto flex items-start justify-between px-3`}
        >
          <div className="fixed top-[100px] card hidden lg:w-[292px] lg:block p-[2.5rem]">
            <div className="">
              <img
                src={WelcomeImg}
                alt="WelcomeImg"
                className=" w-[60%] mx-auto mb-2"
              />
              <p className="text-center font-bold text-sm mb-2">
                On registering, you can
              </p>
            </div>

            <ul className="list-disc">
              {welcomeCheckList &&
                welcomeCheckList.map((list, i) => (
                  <li key={i} className="my-1 text-sm">
                    {" "}
                    {list}
                  </li>
                ))}
            </ul>
          </div>
          <div className="w-[90%] mx-auto lg:mx-0 lg:w-[700px] lg:relative lg:left-[332px] mb-12">
            <div className=" shadow-2xl  bg-white  lg:p-[2.5rem] p-[2rem] rounded-2xl">
              {isShowCompany ? <SignUpFormCompany /> : <SignUpStudent />}
            </div>
            <div className="mt-20 text-center">
              <ul className="list list-none flex text-[1.5vmax] md:text-sm items-center justify-center mb-3">
                {loginFooter &&
                  loginFooter.map((footer, i) => (
                    <li
                      key={i}
                      className=" text-sky-700 "
                      onClick={() => handelPartners(i)}
                    >
                      <a
                        href="#"
                        className={`hover:text-gray-700 ${
                          i == 2 ? "font-extrabold text-base" : ""
                        }`}
                      >
                        {footer}
                      </a>
                      {i != loginFooter.length - 1 && (
                        <span className="mx-1">|</span>
                      )}
                    </li>
                  ))}
              </ul>
              <p className="text-[1.5vmax] md:text-sm text-gray-500 ">
                All rights reserved © 2023 Info Edge India Ltd.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
