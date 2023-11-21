import React, { useEffect, useState } from "react";
import Logo from "../../assets/naukri_Logo.png";
import { Link } from "react-router-dom";
import LoginPage from "./Login";
import SignUp from "./SignUp/SignUp";
import { useSelector } from "react-redux";
import Loader from "../Loader";
import store from "../../store";
import { LoadJobs } from "../../Actions/JobsActions";
import { LoadCompanies } from "../../Actions/CompaniesActions";
import TakeToTop from "../Layout/TakeToTop";

const Header = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuthenticated) {
      // load jobs
      store.dispatch(LoadJobs());

      //loading Companies
      store.dispatch(LoadCompanies());
    }
  }, [isAuthenticated]);

  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      <nav className="w-full z-10 py-5 flex items-center justify-around bg-white shadow shadow-gary  fixed top-0 left-0">
        {loading ? (
          <Loader />
        ) : (
          <div className="relative lg:w-[1128px] w-full px-3 flex items-center justify-between flex-wrap">
            <div className="">
              <Link to="/">
                <img src={Logo} alt="Logo" className="w-[100px] md:w-lg" />
              </Link>
            </div>
            <div className="text-sm md:text-lg">
              <p>
                {showLogin ? "Register here " : "Already Registered? "}
                <button
                  className={`font-bold ${
                    showLogin ? "text-green-500" : "text-blue-500"
                  }`}
                  onClick={() => setShowLogin(!showLogin)}
                  type="button"
                >
                  {showLogin ? "SignUp" : "Login"}
                </button>
                {showLogin ? "" : " here"}
              </p>
            </div>
            <TakeToTop />
          </div>
        )}
      </nav>
      {loading ? null : showLogin ? <LoginPage /> : <SignUp />}
    </>
  );
};

export default Header;
