import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import TakeToTop from "../Layout/TakeToTop";
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import { LoadJobs, UpdateJob, jobDetailsById } from "../../Actions/JobsActions";
import { LoadJobsApplications } from "../../Actions/jobApplicationsActions";
import { Link, useNavigate, useParams } from "react-router-dom";
import ScrollToTop from "../../Utils/ScrollToTop";
import { getCompanyDetails } from "../../Actions/CompaniesActions";
import {
  departmentsConstant,
  requirementsConstants,
} from "../../Constants/GeneralConstants";
import { JOB_STATUSES } from "../../Constants/JobConstants";
import { AiFillCloseCircle } from "react-icons/ai";
import JobDetailsCard from "./JobDetailsCard";

const EditJobPage = () => {
  //state and variables
  const dispatch = useDispatch();
  const navigation = useNavigate();
  let { JobId } = useParams();
  const { loading } = useSelector((state) => state.user);
  const { jobsLoading, jobs } = useSelector((state) => state.jobs);
  const { jobLoading, job } = useSelector((state) => state.job);
  const { companyLoading } = useSelector((state) => state.company);
  const { jobApplicationsLoading } = useSelector((state) => state.applications);

  const [selectedRequirement, setSelectedRequirement] = useState("");
  const [selectedRequirements, setSelectedRequirements] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedHiring_status, setSelectedHiring_status] = useState("");

  useEffect(() => {
    ScrollToTop();
    dispatch(jobDetailsById(JobId));
    dispatch(LoadJobsApplications());
    if (job) {
      dispatch(getCompanyDetails(job.company_id));
    }
  }, []);

  //job Update data
  const [jobUpdate, setJobUpdate] = useState({
    title: job.title || "",
    location: job.location || "",
    description: job.description || "",
    department: job.department || "",
    salary: job.salary || "",
    experience: job.experience || "",
    vacancies: job.vacancies || "",
    hiring_status: job.hiring_status || "",
  });

  useEffect(() => {
    if (job) {
      dispatch(getCompanyDetails(job.company_id));
      setSelectedRequirements(job.requirement);
      setSelectedHiring_status(job.hiring_status);
      setSelectedDepartment(job.department);

      // Update the jobUpdate state with existing job details
      setJobUpdate({
        title: job.title || "",
        location: job.location || "",
        description: job.description || "",
        department: job.department || "",
        salary: job.salary || "",
        experience: job.experience || "",
        vacancies: job.vacancies || "",
        hiring_status: job.hiring_status || "",
      });
    }
  }, [job]);

  const { title, salary, description, location, experience, vacancies } =
    jobUpdate;

  //On change values
  const createJobDataChanges = (e) => {
    setJobUpdate({ ...jobUpdate, [e.target.name]: e.target.value });
  };

  // register HandleSignUpSubmit
  const updateJobSubmit = async (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("title", title);
    myForm.set("location", location);
    myForm.set("salary", salary);
    myForm.set("description", description);
    myForm.set("experience", experience);
    myForm.set("vacancies", vacancies);

    // Set job Categories directly from selectedCategories
    selectedRequirements.forEach((requirement) => {
      myForm.append("requirement[]", requirement);
    });

    // Set job department directly from selected department
    myForm.append("department", selectedDepartment);
    myForm.append("jobId", job._id);

    // Set job hiring_status directly from selected hiring_status
    myForm.append("hiring_status", selectedHiring_status);

    await dispatch(UpdateJob(myForm));
    await dispatch(LoadJobs());

    navigation(`/job/${job._id}`);
  };

  const handleRequirementChange = (event) => {
    if (event.target.value === "") return;
    setSelectedRequirement(event.target.value);
    setSelectedRequirements([...selectedRequirements, event.target.value]);
  };
  const handleRemoveRequirement = (e, requirement) => {
    e.preventDefault();
    const newSelectedRequirements = selectedRequirements.filter(
      (c) => c !== requirement
    );
    setSelectedRequirements(newSelectedRequirements);
  };
  const handleDepartmentChange = (event) => {
    if (event.target.value === "") return;
    setSelectedDepartment(event.target.value);
  };
  const handleHiring_statusChange = (event) => {
    if (event.target.value === "") return;
    setSelectedHiring_status(event.target.value);
  };

  const handleUpdateJobDetails = (id) => {
    dispatch(jobDetailsById(id));
  };
  return (
    <>
      {jobsLoading ||
      jobLoading ||
      companyLoading ||
      jobApplicationsLoading ||
      loading ? (
        <Loader />
      ) : (
        <div
          className={`relative py-[100px] md:w-[1128px] w-full mx-auto flex items-start flex-col px-3`}
        >
          <Header />
          <div className="flex flex-col w-[90%] mx-auto">
            <p className="text-center uppercase tracking-wider text-2xl pt-5 font-bold pb-[2rem]">
              Update Job Details
            </p>
            <form
              className="w-full  mx-auto"
              onSubmit={(e) => updateJobSubmit(e)}
            >
              <div className="flex flex-wrap -mx-4 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="title"
                  >
                    Job Title
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="title"
                    name="title"
                    type="text"
                    placeholder="What is the job title?"
                    required
                    value={title}
                    onChange={createJobDataChanges}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="location"
                  >
                    Location
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="location"
                    type="text"
                    name="location"
                    placeholder="What is the Job location?"
                    required
                    value={location}
                    onChange={createJobDataChanges}
                  />
                </div>
                <div className="w-full px-3 mb-6 md:mb-0 md:mt-6">
                  <label
                    htmlFor="description"
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-700 bg-gray-200 rounded-lg border border-gray-300 focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Write company description here..."
                    required
                    name="description"
                    value={description}
                    onChange={createJobDataChanges}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 md:mt-6">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="requirement"
                  >
                    Requirement
                  </label>
                  <select
                    id="requirement"
                    name="requirement"
                    required
                    className="cursor-pointer appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    value={selectedRequirement}
                    onChange={handleRequirementChange}
                  >
                    <option className="cursor-pointer" value="">
                      Select a Requirement
                    </option>
                    {requirementsConstants.map((requirement, i) => (
                      <option key={i} value={requirement}>
                        {requirement}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 md:mt-6">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="selectedCategories"
                  >
                    Selected Requirement
                  </label>
                  <div className="flex flex-wrap">
                    {selectedRequirements && selectedRequirements.length > 0 ? (
                      selectedRequirements.map((select, i) => (
                        <button
                          key={i}
                          onClick={(e) => handleRemoveRequirement(e, select)}
                          className="bg-gray-200 cursor-pointer relative text-gray-700 border border-gray-200 rounded me-2 mb-2 py-3 px-4 leading-tight hover:outline-none hover:bg-white hover:border-gray-500 group"
                        >
                          {select}
                          <AiFillCloseCircle
                            className="text-red-700 hidden group-hover:block absolute -top-2 -right-2"
                            size={20}
                          />
                        </button>
                      ))
                    ) : (
                      <p className="bg-gray-200 text-gray-700 border border-gray-200 rounded me-2 mb-2 py-3 px-4 leading-tight">
                        No Requirement Selected
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 md:mt-6">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="department"
                  >
                    Job Departments
                  </label>
                  <select
                    id="department"
                    name="department"
                    required
                    className="cursor-pointer appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    value={selectedDepartment}
                    onChange={handleDepartmentChange}
                  >
                    <option className="cursor-pointer" value="">
                      Select a department
                    </option>
                    {departmentsConstant.map((department, i) => (
                      <option key={i} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 md:mt-6">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="salary"
                  >
                    Package (LPA)
                  </label>
                  <input
                    type="text"
                    id="salary"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="What is the Package? (LPA) "
                    required
                    name="salary"
                    value={salary}
                    onChange={createJobDataChanges}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 md:mt-6">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="experience"
                  >
                    experience
                  </label>
                  <input
                    type="text"
                    id="experience"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="How much experience is needed?"
                    required
                    name="experience"
                    value={experience}
                    onChange={createJobDataChanges}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 md:mt-6">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="vacancies"
                  >
                    vacancies
                  </label>
                  <input
                    type="number"
                    id="vacancies"
                    className="input-number appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="How much vacancies is there?"
                    required
                    name="vacancies"
                    value={vacancies}
                    onChange={createJobDataChanges}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 md:mt-6">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="hiring_status"
                  >
                    Hiring status
                  </label>
                  <select
                    id="hiring_status"
                    name="hiring_status"
                    required
                    className="cursor-pointer appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    value={selectedHiring_status}
                    onChange={handleHiring_statusChange}
                  >
                    <option className="cursor-pointer" value="">
                      Select a status
                    </option>
                    {JOB_STATUSES.map((status, i) => (
                      <option key={i} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-wrap -mx-4 mb-6">
                <div className="w-full px-3">
                  <label className="block  tracking-wide text-sm font-semibold mb-3 text-gray-400">
                    Updating Job Details
                  </label>
                  <button
                    type="submit"
                    id="grip-register-btn"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="mt-8 flex flex-col w-[90%] mx-auto">
            <p className="text-lg font-bold  tracking-wider mb-2">All jobs</p>
            {jobs &&
              jobs.length > 0 &&
              jobs.map((J, i) => (
                <Link
                  to={`/job/${J._id}`}
                  key={i}
                  className="text-start"
                  onClick={() => handleUpdateJobDetails(J._id)}
                >
                  {J._id === job._id ? null : (
                    <div className="card w-full md:w-[700px] mt-4 ">
                      {J && <JobDetailsCard job={J} />}
                    </div>
                  )}
                </Link>
              ))}
          </div>
          <TakeToTop />
        </div>
      )}
    </>
  );
};

export default EditJobPage;
