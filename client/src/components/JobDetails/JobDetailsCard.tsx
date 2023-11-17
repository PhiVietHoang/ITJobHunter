import React, { useEffect, useState } from "react";
import { PiSuitcaseFill } from "react-icons/pi";
import { BsCurrencyRupee, BsFillPinMapFill, BsPinAngle } from "react-icons/bs";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  applyToJob,
  deleteMyApplication,
  jobDetailsById,
} from "../../Actions/JobsActions";
import { LoadUser } from "../../Actions/UserSignUp";
import { LoadJobsApplications } from "../../Actions/jobApplicationsActions";

const JobDetailsCard = ({ job, related }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigation = useNavigate();

  const HandleCompanyDetailsPage = (id) => {
    navigation(`/company/${id}`);
  };

  const { applications } = useSelector((state) => state.applications);
  const [application, setApplication] = useState(null);

  useEffect(() => {
    if (applications && applications.length > 0) {
      const fetchedApplication = applications.filter(
        (app) => app.job_id === job._id && app.student_id === user._id
      );
      setApplication(fetchedApplication[0]);
    }
  }, [applications, job, setApplication]);

  const handleCancelJob = async (id) => {
    await dispatch(deleteMyApplication(id));
    await dispatch(LoadUser());
    await dispatch(jobDetailsById(job._id));
    await dispatch(LoadJobsApplications());
    setApplication(null);
  };

  const handleApplyJob = async (id) => {
    await dispatch(applyToJob(id));
    // Load user data after applying to the job
    await dispatch(LoadUser());
    await dispatch(jobDetailsById(job._id));
    await dispatch(LoadJobsApplications());
  };

  const handleEditJob = (id) => {
    navigation(`/editJob/${id}`);
  };

  const handleGetJobApplications = (title) => {
    navigation(`/jobs/applications/${title}`);
  };

  return (
    <>
      <div className="">
        <div className="flex justify-between">
          <p className="text-xs  md:text-lg font-bold text-neutral-950 tracking-wider">
            {job.title}
          </p>
          {user && user.role === "company" && related && (
            <button
              className=" bg-blue-700 font-bold tracking-wider capitalize text-lg text-white px-3 py-1 rounded-2xl"
              onClick={() => handleEditJob(job._id)}
            >
              Edit Job
            </button>
          )}
        </div>
        <p
          onClick={() => HandleCompanyDetailsPage(job.company_id)}
          className="text-xs md:text-sm text-gray-500 tracking-normal mb-5 hover:underline"
        >
          {job.company_name}
        </p>
        <div className="flex items-center justify-start gap-[20px] mb-2 flex-wrap">
          <p className="flex items-center gap-[10px] text-xs md:text-sm text-gray-500 ">
            {" "}
            <PiSuitcaseFill />
            {job.experience} years
          </p>
          <p className=" bg-slate-300 h-[20px] w-[2px] rounded-full mx-1"></p>
          <p className="flex items-center gap-[10px] text-xs md:text-sm text-gray-500 ">
            <BsCurrencyRupee />
            {job.salary ? job.salary + " LPA" : "Not disclosed"}
          </p>
        </div>
        <p className="flex items-center gap-[10px] text-xs md:text-sm text-gray-500 mb-2">
          <BsPinAngle />
          Remote
        </p>
        <p className="flex items-center gap-[10px] text-xs md:text-sm text-gray-500 mb-2">
          <HiOutlineBuildingOffice2 className="" />
          {job.department + " Department"}
        </p>
      </div>
      <div className="flex items-center justify-between gap-[20px] mb-4">
        <p className="flex items-center gap-[10px] text-xs md:text-sm text-gray-500 ">
          <BsFillPinMapFill />
          {job.location}
        </p>
        <p className="text-blue-800 text-xs md:text-sm hover:underline font-medium">
          Send me jobs like this
        </p>
      </div>
      <p className=" bg-slate-300 h-[2px] w-full rounded-full mx-1"></p>
      <div className="w-full flex items-center justify-between mt-5">
        <div className="">
          <ul className="flex items-center gap-[15px] flex-wrap">
            <li className="text-xs md:text-sm text-slate-400">
              Posted: <span className="text-black">{1 + " day ago"}</span>
            </li>
            <li className="text-xs md:text-sm text-slate-400">
              Opening: <span className="text-black">{job.vacancies}</span>
            </li>
            <li
              className={`text-xs md:text-sm text-slate-400 ${
                user &&
                user.name === job.company_name &&
                "hover:underline hover:text-blue-700"
              }`}
            >
              {user.name === job.company_name ? (
                <div onClick={() => handleGetJobApplications(job.title)}>
                  Job Applications:{" "}
                  <span className="text-black">
                    {job.jobApplications && job.jobApplications.length}
                  </span>
                </div>
              ) : (
                <>
                  Job Applications:{" "}
                  <span className="text-black">
                    {job.jobApplications && job.jobApplications.length}
                  </span>
                </>
              )}
            </li>
          </ul>
        </div>
        <div className="flex gap-2 flex-wrap">
          {/* Show Apply button if applicationStatus is not present */}
          {related && !application && (
            <button
              onClick={() => handleApplyJob(job._id)}
              disabled={user.role !== "student"}
              className="bg-blue-500 font-bold tracking-wider text-xs  text-white p-1 text-start rounded-full px-3 hover:bg-transparent hover:text-blue-500 hover:ring-2 hover:ring-blue-500"
            >
              Apply
            </button>
          )}

          {/* Show Status button if applicationStatus is present */}
          {application && application.applicationStatus && (
            <button
              disabled={true}
              className="bg-green-500 font-bold tracking-wider text-xs  text-white p-1 text-start rounded-full px-3 hover:bg-transparent hover:text-green-500 hover:ring-2 hover:ring-green-500"
            >
              Status: {application.applicationStatus}
            </button>
          )}

          {/* Show Cancel button if applicationStatus is present */}
          {related && application && application.applicationStatus && (
            <button
              onClick={() => handleCancelJob(job._id)}
              className="bg-yellow-500 font-bold tracking-wider text-xs  text-white p-1 text-start rounded-full px-3 hover:bg-transparent hover:text-red-500 hover:ring-2 hover:ring-red-500"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default JobDetailsCard;
