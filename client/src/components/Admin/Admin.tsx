import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import ScrollToTop from "../../Utils/ScrollToTop";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import { LoadUser, UpdateUserDetails } from "../../Actions/UserSignUp";
import { LoadCompanies } from "../../Actions/CompaniesActions";
import { LoadJobs } from "../../Actions/JobsActions";
import JobsSection from "./JobsSection";
import CompaniesSection from "./CompaniesSection";
import StudentsSection from "./StudentsSection";
import EngineersSection from "./EngineersSection";

interface User {
    role: string;
    name: string;
    email: string;
    _id: string;
    userStatus: string;
    // Include other properties as needed
}

interface RootState {
    jobs: { jobsLoading: boolean };
    companies: { companiesLoading: boolean };
    uiLoader: { uiLoader: boolean };
    user: { user: User, loading: boolean };
    users: { usersLoading: boolean };
}

const Admin = () => {
  // date from state and hooks
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
  const [editUserName, setEditUserName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [showEditUserName, setShowEditUserName] = useState(false);
  const [showSection, setShowSection] = useState("Jobs");

  const { jobsLoading } = useSelector((state: RootState) => state.jobs);
  const { companiesLoading } = useSelector((state: RootState) => state.companies);
  const { uiLoader } = useSelector((state: RootState) => state.uiLoader);
  const { user, loading } = useSelector((state: RootState) => state.user);
  const { usersLoading } = useSelector((state: RootState) => state.users);

  //effect
  useEffect(() => {
    ScrollToTop();
    dispatch(LoadJobs());
    dispatch(LoadCompanies());
  }, []);

  useEffect(() => {
    if (user && user.role != "admin") {
      navigate("/home");
    }
  }, [user]);

  // useEffect(() => {
  //   dispatch(loadingRequest());
  //   setTimeout(() => {
  //     dispatch(loadingSuccess());
  //   }, 500);
  // }, []);

  // handle Edit user name
  useEffect(() => {
    if (showEditUserName) {
      document.body.style.backgroundColor = "rgb(229,231,235)";
    } else {
      document.body.style.backgroundColor = "#f8f9f8";
    }
  }, [showEditUserName]);

  //functions
  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: editUserName || user.name,
      email: editEmail || user.email,
    };
    setShowEditUserName(false);
    setEditEmail("");
    setEditUserName("");
    dispatch(UpdateUserDetails(data));
    dispatch(LoadUser());
  };

  // handle change of sections
  const handleShowSection = (section: string) => {
    setShowSection(section);
  };

  //

  return (
    <>
      {loading ||
      jobsLoading ||
      usersLoading ||
      companiesLoading ||
      uiLoader ? (
        <Loader />
      ) : (
        <>
          <div
            className={` relative mt-[100px] mx-auto flex items-start justify-start flex-col px-3`}
          >
            <div className=" md:w-[1128px] w-full mx-auto">
              <div className="card">
                <div className="flex items-center justify-start gap-4 flex-wrap">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <button
                    className=" cursor-pointer text-lg"
                    onClick={() => setShowEditUserName(!showEditUserName)}
                  >
                    <BsPencilSquare />
                  </button>
                  {/* Update User Details */}
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
                        placeholder={user.email}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="w-full  lg:w-[300px] h-10 px-3 py-2 rounded-md text-sm text-gray-900 bg-gray-200 focus:outline-none focus:ring-1 focus:ring-cyan-900 focus:border-transparent"
                      />
                      <button className="w-full  lg:w-[300px] h-10 px-3 py-2 rounded-md text-sm text-gray-900 bg-sky-200 focus:outline-none focus:ring-1 focus:ring-cyan-900 focus:border-transparent mt-3">
                        Update User name
                      </button>
                    </form>
                  </div>
                  {/* end Update User Details */}
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
              <ul className="mt-[50px] flex items-center justify-start gap-4">
                <li
                  className=" cursor-pointer "
                  onClick={() => handleShowSection("Jobs")}
                >
                  <span
                    className={`${
                      showSection === "Jobs" &&
                      "text-black font-bold tracking-widest"
                    }`}
                  >
                    Jobs
                  </span>
                  <p
                    className={`${
                      showSection === "Jobs" && "bg-black h-[2px] rounded-full"
                    }`}
                  ></p>
                </li>
                <li
                  className=" cursor-pointer "
                  onClick={() => handleShowSection("Companies")}
                >
                  <span
                    className={`${
                      showSection === "Companies" &&
                      "text-black font-bold tracking-widest"
                    }`}
                  >
                    Companies
                  </span>
                  <p
                    className={`${
                      showSection === "Companies" &&
                      "bg-black h-[2px] rounded-full"
                    }`}
                  ></p>
                </li>
                <li
                  className=" cursor-pointer "
                  onClick={() => handleShowSection("Students")}
                >
                  <span
                    className={`${
                      showSection === "Students" &&
                      "text-black font-bold tracking-widest"
                    }`}
                  >
                    Students
                  </span>
                  <p
                    className={`${
                      showSection === "Students" &&
                      "bg-black h-[2px] rounded-full"
                    }`}
                  ></p>
                </li>
                <li
                  className=" cursor-pointer "
                  onClick={() => handleShowSection("Engineers")}
                >
                  <span
                    className={`${
                      showSection === "Engineers" &&
                      "text-black font-bold tracking-widest"
                    }`}
                  >
                    Engineers
                  </span>
                  <p
                    className={`${
                      showSection === "Engineers" &&
                      "bg-black h-[2px] rounded-full"
                    }`}
                  ></p>
                </li>
                <li
                  className=" cursor-pointer "
                  onClick={() => handleShowSection("Overview")}
                >
                  <span
                    className={`${
                      showSection === "Overview" &&
                      "text-black font-bold tracking-widest"
                    }`}
                  >
                    Overview
                  </span>
                  <p
                    className={`${
                      showSection === "Overview" &&
                      "bg-black h-[2px] rounded-full"
                    }`}
                  ></p>
                </li>
              </ul>
              <p className=" bg-slate-300 h-[1px] w-full rounded-full mb-6"></p>
            </div>
            {/* Sections Overview, Jobs, companies, student and  Engineer */}
            <div
              className={`md:w-[1128px] w-ful mx-auto flex items-start justify-between w-full gap-4  mb-[70px]`}
            >
              {/* {showSection === "Overview" && (
                <OverViewSection />
              )} */}
              {showSection === "Jobs" && <JobsSection />}
              {showSection === "Companies" && <CompaniesSection />}
              {showSection === "Students" && <StudentsSection />}
              {showSection === "Engineers" && <EngineersSection />}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Admin;
