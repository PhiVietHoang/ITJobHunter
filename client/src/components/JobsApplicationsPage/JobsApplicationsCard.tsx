import React, { useEffect, useState } from "react";
import { PiSuitcaseFill } from "react-icons/pi";
import { BsCurrencyRupee, BsFillPinMapFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { applyToJob, deleteMyApplication } from "../../Actions/JobsActions";
import { LoadUser } from "../../Actions/UserSignUp";
import { LoadJobsApplications } from "../../Actions/jobApplicationsActions";
import {
  loadingRequest,
  loadingSuccess,
} from "../../Reducers/uiLoaderReducer.js";

const JobDetailsCard = ({ job, i, application }) => {
  //   console.log(application);
  const { user } = useSelector((state) => state.user);
  const [appliedJob, setAppliedJob] = useState(false);
  const dispatch = useDispatch();

  const navigation = useNavigate();

  const HandleCompanyDetailsPage = (id) => {
    navigation(`/company/${id}`);
  };
  const HandleApplicationDetailsPage = (applicationId) => {
    navigation(`/`);
  };
  const handleGoToJob = (jobId) => {
    navigation(`/job/${jobId}`);
  };

  useEffect(() => {
    const isJobApplied = user.appliedJobs && user.appliedJobs.includes(job._id);
    setAppliedJob(isJobApplied);
    // Include user.appliedJobs in the dependencies array
  }, [user, job._id, user.appliedJobs]);

  const handleCancelJob = async (id) => {
    await dispatch(deleteMyApplication(id));
    dispatch(loadingRequest());
    setTimeout(async () => {
      await dispatch(LoadJobsApplications());
      await dispatch(LoadUser());
      dispatch(loadingSuccess());
    }, 1000);
  };

  return (
    <>
      <div className="">
        <div className="flex justify-between items-start flex-wrap mb-3">
          <div className="">
            <p
              className="text-xs  md:text-lg font-bold text-neutral-950 tracking-wider cursor-pointer 
hover:underline"
              onClick={() => handleGoToJob(job._id)}
            >
              {job.title}
            </p>
            <p className="text-xs md:text-sm text-gray-500  tracking-normal">
              ApplicationId: {application._id}
            </p>
            <p
              onClick={() => HandleCompanyDetailsPage(job.company_id)}
              className="text-xs md:text-sm text-gray-500 cursor-pointer tracking-normal mb-5 hover:underline"
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

            <p className="flex items-center gap-[10px] text-xs md:text-sm mb-4 text-gray-500 ">
              <BsFillPinMapFill />
              {job.location}
            </p>
          </div>
          <div className="">
            <button
              disabled={appliedJob}
              className="bg-green-500 font-bold tracking-wider text-xs  text-white p-1 mb-1 text-center rounded-full px-3 hover:bg-transparent hover:text-green-500 hover:ring-2 hover:ring-green-500 mr-3"
            >
              Status: {application.applicationStatus}
            </button>
            <button
              onClick={() => handleCancelJob(job._id)}
              className={`${
                !appliedJob && "hidden"
              } bg-yellow-500 font-bold tracking-wider text-xs  text-white p-1 mb-1 text-center rounded-full px-3 hover:bg-transparent hover:text-yellow-500 hover:ring-2 hover:ring-yellow-500`}
            >
              Cancel
            </button>
          </div>
        </div>
        <p className=" bg-slate-300 h-[2px] w-full rounded-full mx-1"></p>
        <div className="w-full flex items-center justify-between mt-5">
          <div className="">
            <ul className="flex items-center gap-[15px] flex-wrap">
              <li className="text-xs md:text-sm text-slate-400">
                Posted: <span className="text-black">{i + 1 + " day ago"}</span>
              </li>
              <li className="text-xs md:text-sm text-slate-400">
                Opening: <span className="text-black">{job.vacancies}</span>
              </li>
              <li className="text-xs md:text-sm text-slate-400">
                Job Applications:{" "}
                <span className="text-black">{job.jobApplications.length}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetailsCard;
