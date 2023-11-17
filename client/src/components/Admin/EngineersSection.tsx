import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import {
  UpdateEngineerStatus,
  deleteEngineer,
  getAllEngineersInfo,
} from "../../Actions/UserSignUp";
import { FaUser, FaCheck, FaTrash, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {
  ApplicationStatus,
  updateEngineer,
} from "../../Constants/JobApplicationConstants";

interface Engineer {
    _id: string;
    name: string;
    email: string;
    role: string;
    userStatus: string;
    // Include other properties as needed
}

interface RootState {
    engineers: { engineers: Engineer[] };
    // Include other properties as needed
}
   
const EngineersSection = () => {
  const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
  const navigate = useNavigate();
  const { engineers } = useSelector((state: RootState) => state.engineers);
  const [showAlert, setShowAlert] = useState(false);
  const [showUpdateEngineer, setShowUpdateEngineer] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [engineersStatus, setEngineersStatus] = useState("");
  const [applicantID, setApplicantID] = useState("");

  useEffect(() => {
    if (!engineers || engineers.length <= 0) {
      dispatch(getAllEngineersInfo());
    }
  }, []);
  //functions
  const handleEngineersInfo = (id: string) => {
    navigate(`/userInfo/${id}`);
  };

  const handleDeleteEngineers = async (id: string) => {
    await dispatch(deleteEngineer(id));
    await dispatch(getAllEngineersInfo());
  };

  const handleCloseUpdateEngineer = () => {
    setShowUpdateEngineer(false);
    setName("");
    setRole("");
    setEngineersStatus("");
    setApplicantID("");
  };

  const handleEngineerStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "") return;
    setEngineersStatus(e.target.value);
  };
  const updateEngineersStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShowAlert(true);
    setShowUpdateEngineer(false);
  };

  const handleUpdateEngineers = (user: Engineer) => {
    setName(user.name);
    setRole(user.role);
    setEngineersStatus(user.userStatus || "");
    setApplicantID(user._id);
    setShowUpdateEngineer(!showUpdateEngineer);
  };
  const handleUpdate = async () => {
    const data = {
      engineer_id: applicantID,
      engineerStatus: engineersStatus,
    };
    await dispatch(UpdateEngineerStatus(data));
    await dispatch(getAllEngineersInfo());

    setName("");
    setRole("");
    setEngineersStatus("");
    setApplicantID("");
    setShowAlert(false);
  };
  const handleCancelUpdate = () => {
    setName("");
    setRole("");
    setEngineersStatus("");
    setApplicantID("");
    setShowAlert(false);
  };

  const handleSearch = async () => {
    await dispatch(getAllEngineersInfo());
  };

  const Alert = () => {
    return (
      <div className=" fixed top-[100px] z-10 card left-1/2 -translate-x-1/2">
        <p className="uppercase tracking-wider text-2xl font-bold pb-2">
          Alter
        </p>
        <p className="capitalize tracking-wider text-lg  font-bold pb-5">
          Confirm to Delete the Engineer Status?
        </p>
        <div className="flex justify-between">
          <button
            className="bg-blue-500 font-bold tracking-wider text-lg  text-white p-1 text-start rounded-full px-3 hover:bg-transparent hover:text-blue-500 hover:ring-2 hover:ring-blue-500"
            onClick={() => handleCancelUpdate()}
          >
            No
          </button>
          <button
            className="bg-yellow-500 font-bold tracking-wider text-lg  text-white p-1 text-start rounded-full px-3 hover:bg-transparent hover:text-red-500 hover:ring-2 hover:ring-red-500"
            onClick={() => handleUpdate()}
          >
            Yes
          </button>
        </div>
      </div>
    );
  };
  return (
    <div className="p-4">
      <div className="flex items-center text-xl mb-4 font-semibold gap-4 flex-wrap justify-start w-full">
        <h2 className=" underline">Engineers List</h2>
        <button
          onClick={handleSearch}
          className=" hover:bg-slate-300 text-sm flex items-center justify-between bg-white ring-[1px] ring-zinc-300 rounded-xl py-1 px-3 mr-2 cursor-pointer"
        >
          Get all Engineers
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {engineers &&
          engineers.map((user, i) => (
            <div
              key={user._id}
              className="bg-white w-[300px] cursor-pointer  rounded-lg p-4 shadow-md flex items-start justify-start flex-col"
            >
              <div className="flex items-center w-full justify-between">
                <h3
                  className="text-lg font-semibold hover:underline"
                  onClick={() => handleEngineersInfo(user._id)}
                >
                  {user.name}
                </h3>
                <div className="flex items-center justify-between">
                  <BsPencilSquare
                    className="hover:text-sky-500 mr-4"
                    onClick={() => handleUpdateEngineers(user)}
                  />
                  <FaTrash
                    className="hover:text-red-500"
                    onClick={() => handleDeleteEngineers(user._id)}
                  />
                </div>
              </div>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm mt-2 flex items-center">
                Role: <FaUser className="inline text-green-500 mx-2" />{" "}
                {user.role}
              </p>
              <p className="text-sm">
                Status:{" "}
                {user.userStatus === "approved" ? (
                  <>
                    <FaCheck className="inline text-green-500" /> Approved
                  </>
                ) : (
                  <>
                    <FaTimes className="inline text-red-500" /> Pending
                  </>
                )}
              </p>
            </div>
          ))}
      </div>
      <div
        className={`${
          showUpdateEngineer ? "fixed" : "hidden"
        } top-24 left-1/2 -translate-x-1/2 card rounded-none md:rounded-lg w-full capitalize text-lg md:w-[400px] `}
      >
        <div className="">
          <div className=" flex items-center justify-between mb-3">
            <p className=" font-bold md:text-2xl ">Update Engineer status</p>
            <AiOutlineCloseCircle
              className=" cursor-pointer hover:text-red-700"
              onClick={() => handleCloseUpdateEngineer()}
            />
          </div>
          <p className="tracking-wide text-gray-700 text-sm font-bold mb-2 ">
            Name : <span>{name}</span>
          </p>
          <p className="tracking-wide text-gray-700 text-sm font-bold mb-2 ">
            applicantID : <span>{applicantID}</span>
          </p>
          <p className="tracking-wide text-gray-700 text-sm font-bold mb-2 ">
            Role : <span>{role}</span>
          </p>
          <div className="w-full mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
              htmlFor="hiring_status"
            >
              Engineer status
            </label>
            <select
              id="hiring_status"
              name="hiring_status"
              required
              className="cursor-pointer appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              value={engineersStatus}
              onChange={(e) => handleEngineerStatusChange(e)}
            >
              <option className="cursor-pointer" value="">
                Select a status
              </option>
              {updateEngineer.map((status, i) => (
                <option key={i} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-wrap mb-6">
          <div className="w-full">
            <label className="block  tracking-wide text-sm font-semibold mb-3 text-gray-400">
              Update Engineer Details
            </label>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={updateEngineersStatus}
            >
              Update
            </button>
          </div>
        </div>
      </div>
      {showAlert && <Alert />}
    </div>
  );
};

export default EngineersSection;
