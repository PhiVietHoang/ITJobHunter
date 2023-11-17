import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Loader from "../Loader";
import ScrollToTop from "../../Utils/ScrollToTop";
import { Link } from "react-router-dom";
import JobsListing from "./JobsListing.jsx";
import TakeToTop from "../Layout/TakeToTop.js";
import { LoadUser, UpdateUserDetails } from "../../Actions/UserSignUp";
import CompanyPage from "../Company/Company";
import Admin from "../Admin/Admin";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const { applications, jobApplicationsLoading } = useSelector(
    (state) => state.applications
  );
  const [editUserName, setEditUserName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [showEditUserName, setShowEditUserName] = useState(false);

  //effect
  useEffect(() => {
    ScrollToTop();
  }, []);
  useEffect(() => {
    if (showEditUserName) {
      document.body.style.backgroundColor = "rgb(229,231,235)";
    } else {
      document.body.style.backgroundColor = "#f8f9f8";
    }
  }, [showEditUserName]);

  //functions
  const handleUpdateUser = (e) => {
    e.preventDefault();
    const data = {
      name: editUserName,
      email: editEmail,
    };
    setShowEditUserName(false);
    setEditEmail("");
    setEditUserName("");
    dispatch(UpdateUserDetails(data));
    dispatch(LoadUser());
  };

  return (
    <>
      {loading || jobApplicationsLoading ? (
        <Loader />
      ) : (
        <>
          <Header />
          {user && user.role === "student" && (
            <div className="md:w-[1128px] min-h-[90vh] mb-[100px] py-4 text-sm md:text-lg font-bold w-ful px-4 mx-auto flex flex-wrap items-start justify-between ">
              <div className="mt-[100px] card w-full md:w-[480px] ">
                <div className="flex items-center justify-start gap-4 flex-wrap">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <button
                    className=" cursor-pointer text-lg"
                    onClick={() => setShowEditUserName(!showEditUserName)}
                  >
                    <BsPencilSquare />
                  </button>
                  <div
                    className={`card fixed top-[100px] w-[350px] left-1/2 -translate-x-1/2 ${
                      !showEditUserName && "hidden"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h1>Basic details:</h1>
                      <button onClick={() => setShowEditUserName(false)}>
                        <AiOutlineCloseCircle className="text-lg" />
                      </button>
                    </div>
                    <form
                      className="flex flex-col items-start justify-start"
                      onSubmit={(e) => handleUpdateUser(e)}
                    >
                      <label htmlFor="userName" className=" text-sm mb-2">
                        User Name:
                      </label>
                      <input
                        type="text"
                        value={editUserName}
                        required
                        placeholder={user.name}
                        onChange={(e) => setEditUserName(e.target.value)}
                        className="w-full  lg:w-[300px] h-10 px-3 py-2 rounded-md text-sm text-gray-900 bg-gray-200 focus:outline-none focus:ring-1 focus:ring-cyan-900 focus:border-transparent"
                      />
                      <label htmlFor="userName" className=" text-sm my-2">
                        Email:
                      </label>
                      <input
                        type="email"
                        value={editEmail}
                        required
                        placeholder={user.email}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="w-full  lg:w-[300px] h-10 px-3 py-2 rounded-md text-sm text-gray-900 bg-gray-200 focus:outline-none focus:ring-1 focus:ring-cyan-900 focus:border-transparent"
                      />
                      <button className="w-full  lg:w-[300px] h-10 px-3 py-2 rounded-md text-sm text-gray-900 bg-sky-200 focus:outline-none focus:ring-1 focus:ring-cyan-900 focus:border-transparent mt-3">
                        Update User name
                      </button>
                    </form>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  User id: {user._id}
                </p>
                {/* straight link */}
                <p className=" bg-slate-200 h-[1px] rounded-full mb-4"></p>
                <div className="flex items-start justify-start  flex-col">
                  <p className="text-xl tracking-widest  font-bold">
                    User Details:
                  </p>
                  <p className="text-sm md:text-lg text-gray-500 ">
                    Role: <span className="capitalize">{user.role}</span>
                  </p>
                  <p className="text-sm md:text-lg text-gray-500 ">
                    Email: <span className="">{user.email}</span>
                  </p>
                  <p className="text-sm md:text-lg text-gray-500 ">
                    User Status:{" "}
                    <span className="capitalize">{user.userStatus}</span>
                  </p>
                </div>
              </div>
              <div className="mt-[100px] card w-full md:w-[480px] ">
                <h1 className="text-2xl font-bold mb-2">
                  {user.appliedJobs && user.appliedJobs.length > 0
                    ? "Jobs Applied: " + user.appliedJobs.length
                    : "No Jobs Applied Yet"}
                </h1>
                <p className=" bg-slate-200 h-[1px]  rounded-full mb-4"></p>
                <div className="flex items-start  flex-col">
                  {applications && applications.length > 0 ? (
                    <JobsListing />
                  ) : (
                    user.appliedJobs &&
                    user.appliedJobs.length === 0 && (
                      <Link
                        to="/jobs"
                        className="text-lg text-gray-500 underline hover:text-blue-700"
                      >
                        Apply Now
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
          {user && user.role === "company" && <CompanyPage />}
          {user && user.role === "admin" && <Admin />}
          <TakeToTop />
        </>
      )}
    </>
  );
};

export default ProfilePage;
