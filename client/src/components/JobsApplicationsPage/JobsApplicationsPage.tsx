import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import {
  LoadJobsApplications,
  getJobsApplicationsByApplicationStatus,
  getJobsApplicationsByCompanyName,
  getJobsApplicationsByJobsTitle,
} from "../../Actions/jobApplicationsActions";
import {
  ApplicationStatus,
  applicationsFilter,
} from "../../Constants/JobApplicationConstants";
import { useNavigate, useParams } from "react-router-dom";
import ScrollToTop from "../../Utils/ScrollToTop";
import JobsApplicationsCard from "./JobsApplicationsCard.jsx";
import { LoadJobs } from "../../Actions/JobsActions";
import JobsApplications from "./JobsApplications";

const JobsApplicationsPage = () => {
  //Loading Applications
  const dispatch = useDispatch();
  const { JobTitle } = useParams();
  // get State
  const [showApplicationStatus, setShowApplicationStatus] = useState(false);
  const [showJobs, setShowJobs] = useState(false);
  const { applications, jobApplicationsLoading } = useSelector(
    (state) => state.applications
  );
  const [isUpdate, setIsUpdate] = useState(false);
  const { uiLoader } = useSelector((state) => state.uiLoader);
  const { jobs, jobsLoading } = useSelector((state) => state.jobs);
  const { user, loading } = useSelector((state) => state.user);

  // useEffect(() => {}, [user]);
  useEffect(() => {
    ScrollToTop();
    dispatch(LoadJobs());
    if (JobTitle) {
      dispatch(getJobsApplicationsByJobsTitle(JobTitle));
    } else if (user.role !== "student") {
      dispatch(getJobsApplicationsByCompanyName(user.name));
    } else {
      dispatch(LoadJobsApplications());
    }
  }, []);

  useEffect(() => {
    if (isUpdate) {
      setIsUpdate(false);
      dispatch(LoadJobsApplications);
    }
  }, [isUpdate, dispatch]);

  let applicationIds =
    applications &&
    applications.length > 0 &&
    applications.map((item) => item.job_id);

  //filter
  const handleJobApplicationFilter = (field, i) => {
    if (field === "Application Status") {
      setShowApplicationStatus(!showApplicationStatus);
      setShowJobs(false);
    } else {
      setShowJobs(!showJobs);
      setShowApplicationStatus(false);
    }
  };
  const handleApplicationStatusFilter = (field) => {
    setShowApplicationStatus(!showApplicationStatus);
    dispatch(getJobsApplicationsByApplicationStatus(field));
  };
  const handleApplicationJobsFilter = (field) => {
    setShowJobs(!showJobs);
    dispatch(getJobsApplicationsByJobsTitle(field));
  };
  const handleGetAllApplications = () => {
    setShowApplicationStatus(false);
    setShowJobs(false);
    dispatch(LoadJobsApplications());
  };

  const navigator = useNavigate();
  return (
    <>
      {jobApplicationsLoading || jobsLoading || loading || uiLoader ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="min-h-[90vh] mb-[100px]">
            <div className="bg-white mb-4  mt-[80px]">
              <div className=" tracking-wider w-full md:w-[1128px] py-4 text-sm md:text-lg font-bold w-ful px-4 mx-auto flex items-center gap-3 py-auto flex-wrap justify-start">
                <p>
                  {applications && applications.length} Applications Filter:
                </p>
                <ul className="flex items-start gap-3 py-auto flex-wrap justify-start">
                  {applicationsFilter.map((field, i) => (
                    <li
                      className="text-xs ring-[1px] cursor-pointer ring-zinc-300 rounded-xl py-1 px-4 hover:bg-gray-300 hover:text-gray-800 text-gray-700 tracking-wider"
                      key={i}
                      onClick={() => handleJobApplicationFilter(field, i)}
                    >
                      {field}
                    </li>
                  ))}
                  <li
                    className="text-xs ring-[1px] cursor-pointer ring-zinc-300 rounded-xl py-1 px-4 hover:bg-gray-300 hover:text-gray-800 text-gray-700 tracking-wider"
                    onClick={() => handleGetAllApplications()}
                  >
                    All Applications
                  </li>
                </ul>
              </div>
            </div>
            {/* Filtered Job Applications */}
            <div className="md:w-[1128px]  w-ful mx-auto flex items-start flex-col justify-start mb-4 px-4">
              <ul
                className={`mt-3 ${
                  showApplicationStatus ? "block" : "hidden"
                } bg-white ring-[1px] ring-zinc-300 rounded-xl py-1  mr-2`}
              >
                {ApplicationStatus.map((field, i) => (
                  <li
                    className="hover:bg-slate-200 px-2 cursor-pointer"
                    key={i}
                    onClick={() => handleApplicationStatusFilter(field)}
                  >
                    {field}
                  </li>
                ))}
              </ul>
              <ul
                className={`mt-3 ${
                  showJobs ? "block" : "hidden"
                } bg-white ring-[1px] ring-zinc-300 rounded-xl py-1  mr-2`}
              >
                {jobs.length > 0 &&
                  jobs.map(
                    (field, i) =>
                      field.company_name === user.name && (
                        <li
                          className="hover:bg-slate-200 px-2 cursor-pointer"
                          key={i}
                          onClick={() =>
                            handleApplicationJobsFilter(field.title, i)
                          }
                        >
                          {field.title}
                        </li>
                      )
                  )}
              </ul>
            </div>
            {applications &&
            applications.length > 0 &&
            user &&
            user.role === "student" ? (
              <div className="md:w-[1128px] w-full mx-auto flex items-start flex-col justify-start mb-4 px-4">
                {applications &&
                  jobs.length > 0 &&
                  jobs.map(
                    (job, i) =>
                      applicationIds &&
                      applicationIds.length > 0 &&
                      applicationIds.some((id) => id === job._id) && (
                        <div className="card w-full md:w-[700px] mt-4 " key={i}>
                          <JobsApplicationsCard
                            job={job}
                            i={i}
                            application={applications.find(
                              (application) => application.job_id === job._id
                            )}
                          />
                        </div>
                      )
                  )}
              </div>
            ) : (
              <JobsApplications
                setIsUpdate={setIsUpdate}
                applications={applications}
                user={user}
              />
            )}
            {applications && applications.length <= 0 && (
              <p className=" text-2xl font-semibold w-full h-[60vh] tracking-wider text-center">
                Job Applications Not available,{" "}
                <button
                  className="text-blue-600 underline hover:text-blue-800"
                  onClick={() => navigator("/jobs")}
                >
                  Jobs Page
                </button>
              </p>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default JobsApplicationsPage;
