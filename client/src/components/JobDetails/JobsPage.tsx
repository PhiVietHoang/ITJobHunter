import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import JobDetailsCard from "./JobDetailsCard.js";
import TakeToTop from "../Layout/TakeToTop.js";
import { CompanyFilter } from "../../Constants/GeneralConstants";
import { AiFillCaretDown } from "react-icons/ai";
import Loader from "../Loader";
import {
  LoadJobs,
  filterJobsByExperience,
  searchJobs,
} from "../../Actions/JobsActions";
import ScrollToTop from "../../Utils/ScrollToTop";
import { LoadCompanies } from "../../Actions/CompaniesActions";

const JobsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    ScrollToTop();
    dispatch(LoadCompanies());
    dispatch(LoadJobs());
  }, []);

  const { jobsLoading, jobs } = useSelector((state) => state.jobs);
  const { companiesLoading, companies } = useSelector(
    (state) => state.companies
  );

  const [showLocation, setShowLocation] = useState(false);
  const [showSalary, setShowSalary] = useState(false);
  const [showCompanies, setShowCompanies] = useState(false);
  const [showExperience, setShowExperience] = useState(false);
  const [showRequirement, setShowRequirement] = useState(false);

  const HandelFilterJobs = (field) => {
    console.log(field);
    if (field == "companies") {
      setShowCompanies(!showCompanies);
      setShowLocation(false);
      setShowSalary(false);
      setShowRequirement(false);
      setShowExperience(false);
    } else if (field == "location") {
      setShowLocation(!showLocation);
      setShowCompanies(false);
      setShowExperience(false);
      setShowRequirement(false);
      setShowSalary(false);
    } else if (field == "experience") {
      setShowExperience(!showExperience);
      setShowCompanies(false);
      setShowLocation(false);
      setShowRequirement(false);
      setShowSalary(false);
    } else if (field == "requirements") {
      setShowRequirement(!showRequirement);
      setShowCompanies(false);
      setShowLocation(false);
      setShowExperience(false);
      setShowSalary(false);
    } else {
      setShowSalary(!showSalary);
      setShowRequirement(false);
      setShowCompanies(false);
      setShowLocation(false);
      setShowExperience(false);
    }
  };

  const handleJobsFilterByLocation = (L) => {
    setShowLocation(!showLocation);
    dispatch(searchJobs(L));
  };
  const handleJobsFilterByCompany = (companyName) => {
    setShowCompanies(!showCompanies);
    dispatch(searchJobs(companyName));
  };

  const handleJobsFilterBySalary = (S) => {
    setShowSalary(!showSalary);
    dispatch(searchJobs(S));
  };

  const handleFilterJobsByExperience = (e) => {
    setShowExperience(!showExperience);
    dispatch(filterJobsByExperience(e));
  };

  const handleGetAllJobs = () => {
    dispatch(searchJobs());
    setShowCompanies(false);
    setShowLocation(false);
    setShowRequirement(false);
    setShowSalary(false);
    setShowExperience(false);
  };
  return (
    <>
      {jobsLoading || companiesLoading ? (
        <Loader />
      ) : (
        <div className="">
          <Header />
          <div className="min-h-[90vh] mb-[100px]">
            <div className="bg-white header mb-4 ">
              <header className="mt-[80px] px-5 py-3 text-lg font-bold bg-white gap-4 md:w-[1128px] w-ful mx-auto flex items-center flex-wrap justify-start">
                <p className="text-sm md:text-lg ">
                  {jobs && jobs.length} Jobs
                </p>
                <ul className="flex items-start justify-start gap-3 flex-wrap uppercase ">
                  <li
                    className=" hover:bg-slate-300 text-xs md:text-lg flex items-center justify-between bg-white ring-[1px] ring-zinc-300 rounded-xl py-1 px-3 mr-2 cursor-pointer"
                    onClick={() => handleGetAllJobs()}
                  >
                    All Jobs
                  </li>
                  {CompanyFilter.map(
                    (field, i) =>
                      i != 0 && (
                        <li
                          key={field}
                          className=" hover:bg-slate-300 text-xs md:text-lg flex items-center justify-between bg-white ring-[1px] ring-zinc-300 rounded-xl py-1 px-3 mr-2 cursor-pointer"
                          onClick={() => HandelFilterJobs(field)}
                        >
                          {field}
                          <AiFillCaretDown className="ml-2 text-xs" />
                        </li>
                      )
                  )}
                </ul>
              </header>
            </div>
            <div className="md:w-[1128px] w-ful mx-auto flex items-start flex-col justify-start mb-4 px-4">
              {/* showSalary */}
              <ul
                className={`mt-3 ${
                  showSalary ? "block" : "hidden"
                } bg-white ring-[1px] ring-zinc-300 rounded-xl py-1  mr-2`}
              >
                {jobs.length > 0 &&
                  jobs.map(({ salary }, i) => (
                    <li
                      key={i}
                      className="hover:bg-slate-200 px-2 cursor-pointer"
                      onClick={() => handleJobsFilterBySalary(salary)}
                    >
                      {salary} LPA
                    </li>
                  ))}
                <li
                  className="hover:bg-slate-200 px-2 cursor-pointer"
                  onClick={() => handleJobsFilterBySalary()}
                >
                  All jobs
                </li>
              </ul>
              {/* showRequirement */}
              <ul
                className={`mt-3 ${
                  showRequirement ? "block" : "hidden"
                } bg-white ring-[1px] ring-zinc-300 rounded-xl py-1  mr-2`}
              >
                {jobs.length > 0 && (
                  <ul>
                    {" "}
                    {jobs.map(
                      ({ requirement }, jobIndex) =>
                        jobIndex !== 1 &&
                        requirement.map((req, reqIndex) => (
                          <li
                            key={reqIndex}
                            className="hover:bg-slate-200 px-2 cursor-pointer"
                          >
                            {req}
                          </li>
                        ))
                    )}{" "}
                  </ul>
                )}
                <li
                  className="hover:bg-slate-200 px-2 cursor-pointer"
                  onClick={() => dispatch(searchJobs())}
                >
                  All jobs
                </li>
              </ul>
              {/* showLocation */}
              <ul
                className={`mt-3 ${
                  showLocation ? "block" : "hidden"
                } bg-white ring-[1px] ring-zinc-300 rounded-xl py-1  mr-2`}
              >
                {jobs.length > 0 &&
                  jobs.map(({ location }, i) => (
                    <li
                      key={i}
                      onClick={() => handleJobsFilterByLocation(location)}
                      className="hover:bg-slate-200 px-2 cursor-pointer"
                    >
                      {location}
                    </li>
                  ))}
                <li
                  onClick={() => handleJobsFilterByLocation()}
                  className="hover:bg-slate-200 px-2 cursor-pointer"
                >
                  All Locations
                </li>
              </ul>
              {/* showExperience */}
              <ul
                className={`mt-3 ${
                  showExperience ? "block" : "hidden"
                } bg-white ring-[1px] ring-zinc-300 rounded-xl py-1  mr-2`}
              >
                <li
                  className="hover:bg-slate-200 px-2 cursor-pointer"
                  onClick={() => handleFilterJobsByExperience("1")}
                >
                  1 Years
                </li>
                <li
                  className="hover:bg-slate-200 px-2 cursor-pointer"
                  onClick={() => handleFilterJobsByExperience("2")}
                >
                  2 Years
                </li>
                <li
                  className="hover:bg-slate-200 px-2 cursor-pointer"
                  onClick={() => handleFilterJobsByExperience("3")}
                >
                  3 Years
                </li>
                <li
                  className="hover:bg-slate-200 px-2 cursor-pointer"
                  onClick={() => handleFilterJobsByExperience("4")}
                >
                  4 Years
                </li>
                <li
                  className="hover:bg-slate-200 px-2 cursor-pointer"
                  onClick={() => handleFilterJobsByExperience("5")}
                >
                  5 Years
                </li>
                <li
                  className="hover:bg-slate-200 px-2 cursor-pointer"
                  onClick={() => handleFilterJobsByExperience()}
                >
                  Any Experience
                </li>
              </ul>
              {/* showCompanies */}
              <ul
                className={`mt-3 ${
                  showCompanies ? "block" : "hidden"
                } bg-white ring-[1px] ring-zinc-300 rounded-xl py-1  mr-2`}
              >
                <li
                  className="hover:bg-slate-200 px-2 cursor-pointer"
                  onClick={() => handleJobsFilterByCompany()}
                >
                  All companies
                </li>
                {companies.length > 0 &&
                  companies.map((company, i) => (
                    <li
                      key={i}
                      className="hover:bg-slate-200 px-2 cursor-pointer"
                      onClick={() => handleJobsFilterByCompany(company.name)}
                    >
                      {company.name}
                    </li>
                  ))}
              </ul>
              {jobs.length > 0 ? (
                jobs.map((job, i) => (
                  <Link
                    key={i}
                    to={`/job/${job._id}`}
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <div className="card w-full md:w-[700px] mt-4 ">
                      <JobDetailsCard job={job} />
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-bold text-lg text-black mt-4">
                  Jobs Not available,{" "}
                  <button
                    className="underline text-blue-600 hover:text-blue-800"
                    onClick={() => dispatch(searchJobs())}
                  >
                    All jobs
                  </button>
                </p>
              )}
            </div>
            <TakeToTop />
          </div>
        </div>
      )}
    </>
  );
};

export default JobsPage;
