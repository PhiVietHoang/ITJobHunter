import React, { useState } from "react";
import { FaUser, FaClock } from "react-icons/fa";
import moment from "moment";
import { Link } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlineCloseCircle, AiOutlineDelete } from "react-icons/ai";

import { ApplicationStatus } from "../../Constants/JobApplicationConstants";
import { useDispatch } from "react-redux";
import {
  LoadJobsApplications,
  deleteApplicationById,
  updateJobApplication,
} from "../../Actions/jobApplicationsActions";

const JobsApplications = ({ applications, user, setIsUpdate }) => {
  const dispatch = useDispatch();
  const [showUpdateApplication, setShowUpdateApplication] = useState(false);
  const [title, setTitle] = useState("");
  const [applicantID, setApplicantID] = useState("");
  const [applicationStatus, setApplicationStatus] = useState("");
  const [updateApplicationId, setUpdateApplicationId] = useState(null);
  const [showDeleteAlter, setShowDeleteAlter] = useState(false);

  const handleUpdateJobApplication = (application) => {
    setShowUpdateApplication(true);
    setUpdateApplicationId(application._id);
    setTitle(application.title);
    setApplicantID(application.student_id);
    setApplicationStatus(application.applicationStatus);
  };

  const UpdateJobApplication = async () => {
    setIsUpdate && setIsUpdate(true);
    setShowUpdateApplication(false);
    const updateData = {
      application_id: updateApplicationId,
      application_status: applicationStatus,
    };
    await dispatch(updateJobApplication(updateData));
    await dispatch(LoadJobsApplications());
  };
  const handleCloseUpdateJobApplication = () => {
    setUpdateApplicationId("");
    setTitle("");
    setApplicantID("");
    setApplicationStatus("");
    setShowUpdateApplication(!showUpdateApplication);
  };
  const handleApplicationStatusChange = (event) => {
    if (event.target.value === "") return;
    setApplicationStatus(event.target.value);
  };

  const handleDeleteJobApplication = (id) => {
    setShowDeleteAlter(true);
    setApplicantID(id);
  };
  const handleCancelDelete = () => {
    setShowDeleteAlter(false);
    setApplicantID("");
  };
  const handleConfirmDeleteJobApplication = async () => {
    setShowDeleteAlter(false);
    await dispatch(deleteApplicationById(applicantID));
    setApplicantID("");
    await dispatch(LoadJobsApplications());
  };
  const Alert = () => {
    return (
      <div className=" fixed top-[100px] z-10 card left-1/2 -translate-x-1/2">
        <p className="uppercase tracking-wider text-2xl font-bold pb-2">
          Alter
        </p>
        <p className="capitalize tracking-wider text-lg  font-bold pb-5">
          Confirm to Delete the Job Application?
        </p>
        <div className="flex justify-between">
          <button
            className="bg-blue-500 font-bold tracking-wider text-lg  text-white p-1 text-start rounded-full px-3 hover:bg-transparent hover:text-blue-500 hover:ring-2 hover:ring-blue-500"
            onClick={() => handleCancelDelete()}
          >
            No
          </button>
          <button
            className="bg-yellow-500 font-bold tracking-wider text-lg  text-white p-1 text-start rounded-full px-3 hover:bg-transparent hover:text-red-500 hover:ring-2 hover:ring-red-500"
            onClick={() => handleConfirmDeleteJobApplication()}
          >
            Yes
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className=" relative w-full md:w-[1128px] tracking-wider mx-auto flex items-start flex-col justify-start mb-4 px-4">
      <div
        className={`${
          showUpdateApplication ? "fixed" : "hidden"
        } top-24 left-1/2 -translate-x-1/2 card rounded-none md:rounded-lg w-full capitalize text-lg md:w-[400px] `}
      >
        <div className="">
          <div className=" flex items-center justify-between mb-3">
            <p className=" font-bold md:text-2xl ">Update Application</p>
            <AiOutlineCloseCircle
              className=" cursor-pointer hover:text-red-700"
              onClick={() => handleCloseUpdateJobApplication()}
            />
          </div>
          <p className="tracking-wide text-gray-700 text-sm font-bold mb-2 ">
            title : <span>{title}</span>
          </p>
          <p className="tracking-wide text-gray-700 text-sm font-bold mb-2 ">
            applicantID : <span>{applicantID}</span>
          </p>
          <div className="w-full mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
              htmlFor="hiring_status"
            >
              Application status
            </label>
            <select
              id="hiring_status"
              name="hiring_status"
              required
              className="cursor-pointer appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              value={applicationStatus}
              onChange={(e) => handleApplicationStatusChange(e)}
            >
              <option className="cursor-pointer" value="">
                Select a status
              </option>
              {ApplicationStatus.map((status, i) => (
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
              Update Application Details
            </label>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => UpdateJobApplication()}
            >
              Update
            </button>
          </div>
        </div>
      </div>
      {applications &&
        applications.length > 0 &&
        applications.map(
          (application) =>
            application.company_name === user.name && (
              <div
                key={application._id}
                className="card w-full md:w-[700px] mt-4 bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <div className="">
                  <div className="flex justify-between items-center">
                    <Link
                      to={`/job/${application.job_id}`}
                      className="text-xl font-semibold mb-2 hover:cursor-pointer hover:underline hover:text-blue-700"
                    >
                      {application.title}
                    </Link>
                    <div className="flex justify-between  items-center">
                      <BsPencilSquare
                        className=" cursor-pointer hover:text-sky-700 mr-5"
                        onClick={() => handleUpdateJobApplication(application)}
                      />
                      <AiOutlineDelete
                        className=" cursor-pointer hover:text-yellow-700"
                        onClick={() =>
                          handleDeleteJobApplication(application._id)
                        }
                      />
                    </div>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <FaUser className="mr-1" />
                    <span className="">{application.company_name}</span>
                  </div>
                  <div className="flex items-center text-gray-500 mt-2">
                    <FaClock className="mr-1" />
                    <span>
                      Applied {moment(application.jobAppliedAt).fromNow()}
                    </span>
                  </div>
                  <div className="mt-4 font-bold">
                    <h3 className="text-lg font-semibold mb-2">
                      Applicant Details
                    </h3>
                    <p className="text-gray-600">
                      Applicant ID:{" "}
                      <Link
                        to={`/userInfo/${application.student_id}`}
                        className="hover:cursor-pointer hover:underline hover:text-blue-700"
                      >
                        {application.student_id}
                      </Link>
                    </p>
                    <p className={`text-gray-600 `}>
                      Application Status:{" "}
                      <span
                        className={`${
                          application.applicationStatus === "Closed" ||
                          application.applicationStatus === "Rejected" ||
                          application.applicationStatus === "Offer Declined" ||
                          application.applicationStatus === "Pending"
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {application.applicationStatus}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )
        )}
      {showDeleteAlter && <Alert />}
    </div>
  );
};

export default JobsApplications;
