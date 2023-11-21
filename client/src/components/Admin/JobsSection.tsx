import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobDetailsCard from "../JobDetails/JobDetailsCard";
import {
  CompanyFilter,
  departmentsConstant,
} from "../../Constants/GeneralConstants";
import { AiFillCaretDown } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { searchJobs } from "../../Actions/JobsActions";

type Job = {
  requirement: string;
  _id: string;
  // include other properties here
 };

type JobDetailsCardProps = {
  job: Job;
  // remove the related prop
};

interface RootState {
  jobs: any; // Replace 'any' with the actual type of 'jobs'
  // Add other state slices here
 }

const JobsSection = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const { jobs } = useSelector((state: RootState) => state.jobs);
  const [showDepartment, setShowDepartment] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showSalary, setShowSalary] = useState(false);
  const [showExperience, setShowExperience] = useState(false);
  const [showRequirements, setShowRequirements] = useState(false);

  //functions
  const handleShowJobDetails = (id: string) => {
    navigation(`/job/${id}`);
  };

  const HandelFilterJobs = (field: string) => {
    if (field == "department") {
      setShowDepartment(!showDepartment);
      setShowLocation(false);
      setShowExperience(false);
      setShowSalary(false);
      setShowRequirements(false);
    } else if (field == "location") {
      setShowLocation(!showLocation);
      setShowDepartment(false);
      setShowExperience(false);
      setShowSalary(false);
      setShowRequirements(false);
    } else if (field == "experience") {
      setShowExperience(!showExperience);
      setShowLocation(false);
      setShowSalary(false);
      setShowDepartment(false);
      setShowRequirements(false);
    } else if (field == "salary") {
      setShowSalary(!showSalary);
      setShowDepartment(false);
      setShowLocation(false);
      setShowExperience(false);
      setShowRequirements(false);
    } else {
      setShowRequirements(!showRequirements);
      setShowSalary(false);
      setShowDepartment(false);
      setShowLocation(false);
      setShowExperience(false);
    }
  };

  const handleJobsFilterByLocation = (L: string = "") => {
    setShowLocation(!showLocation);
    dispatch(searchJobs(L));
   };

  const handleJobsFilterByDepartment = (D: string = "") => {
    setShowDepartment(!showDepartment);
    dispatch(searchJobs(D));
   };

  const handleJobsFilterBySalary = (S: string = "") => {
    setShowSalary(!showSalary);
    dispatch(searchJobs(S));
  };

  const handleFilterJobsByExperience = (e: string = "") => {
    setShowExperience(!showExperience);
    dispatch(searchJobs(e));
   };

  const handleFilterJobsByRequirement = (r: string = "") => {
    setShowRequirements(!showRequirements);
    r ? dispatch(searchJobs(r[0])) : dispatch(searchJobs());
   };

  return (
    <div
      className={`md:w-[1128px] w-full mx-auto flex items-start justify-center flex-col`}
    >
      <div className="mt-4">
        <p className="text-bold text-lg md:text-2xl font-bold text-black mb-4">
          {jobs.length} Job openings
        </p>
        <div>
          <ul className="flex items-start justify-start gap-3 flex-wrap uppercase mt-3">
            {CompanyFilter.map(
              (field, i) =>
                i <= 4 && (
                  <li
                    key={field}
                    className=" hover:bg-slate-300 text-sm flex items-center justify-between bg-white ring-[1px] ring-zinc-300 rounded-xl py-1 px-3 mr-2 cursor-pointer"
                    onClick={() => HandelFilterJobs(field)}
                  >
                    {field}
                    <AiFillCaretDown className="ml-2 text-xs" />
                  </li>
                )
            )}
          </ul>
          <ul
            className={`mt-3 ${
              showDepartment ? "block" : "hidden"
            } bg-white ring-[1px] ring-zinc-300 rounded-xl py-1  mr-2`}
          >
            {departmentsConstant.map((D, i) => (
              <li
                key={i}
                className="hover:bg-slate-200 px-2 cursor-pointer"
                onClick={() => handleJobsFilterByDepartment(D)}
              >
                {D}
              </li>
            ))}
            <li
              className="hover:bg-slate-200 px-2 cursor-pointer"
              onClick={() => handleJobsFilterByDepartment()}
            >
              All Departments
            </li>
          </ul>
          <ul
            className={`mt-3 ${
              showSalary ? "block" : "hidden"
            } bg-white ring-[1px] ring-zinc-300 rounded-xl py-1  mr-2`}
          >
            {jobs.map(({ salary }: { salary: number }, i: number) => (
              <li
                key={i}
                className="hover:bg-slate-200 px-2 cursor-pointer"
                onClick={() => handleJobsFilterBySalary(salary.toString())}
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
          <ul
            className={`mt-3 ${
              showRequirements ? "block" : "hidden"
            } bg-white ring-[1px] ring-zinc-300 rounded-xl py-1  mr-2`}
          >
            {jobs.length > 0 &&
              jobs.map((job: Job, i: number) => (
                <li
                  key={i}
                  className="hover:bg-slate-200 px-2 cursor-pointer"
                  onClick={() => handleFilterJobsByRequirement(job.requirement)}
                >
                  <ul className="flex flex-wrap">
                    {job.requirement &&
                      job.requirement.split(',').map((requirement, j) => (
                        <li key={j} className="pr-2">
                          {requirement.trim()}
                          {j === job.requirement.length - 1 ? "" : ","}
                        </li>
                    ))}
                  </ul>
                </li>
              ))}

            <li
              className="hover:bg-slate-200 px-2 cursor-pointer"
              onClick={() => handleFilterJobsByRequirement()}
            >
              All jobs
            </li>
          </ul>
          <ul
            className={`mt-3 ${
              showLocation ? "block" : "hidden"
            } bg-white ring-[1px] ring-zinc-300 rounded-xl py-1  mr-2`}
          >
            {jobs.map(({ location }: { location: string }, i: number) => (
              <li
                key={i}
                onClick={() => handleJobsFilterByLocation(location)}
                className="hover:bg-slate-200 px-2 cursor-pointer"
              >
                {location}
              </li>
            ))}
            <li
              className="hover:bg-slate-200 px-2 cursor-pointer"
              onClick={() => handleJobsFilterByLocation()}
            >
              All Locations
            </li>
          </ul>
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
        </div>
        {jobs.length == 0 && (
          <p className="text-bold text-lg text-black mt-4">
            Jobs Not available,{" "}
            <button
              className="underline text-blue-600 hover:text-blue-800"
              onClick={() => handleJobsFilterByDepartment()}
            >
              try again
            </button>
          </p>
        )}
      </div>
      <div className="">
        {jobs.length > 0 &&
          jobs.map((job: Job) => (
            <div key={job._id} onClick={() => handleShowJobDetails(job._id)}>
              <div className="card w-full md:w-[700px] mt-4 ">
                <JobDetailsCard job={job} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default JobsSection;
