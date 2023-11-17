import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "../../Utils/ScrollToTop";

const JobsListing = ({ jobId }) => {
  const navigation = useNavigate();

  useEffect(() => {
    ScrollToTop();
  }, []);

  const { applications } = useSelector((state) => state.applications);
  const handleGetJob = (id) => {
    navigation(`/job/${id}`);
  };
  return (
    <>
      {applications.map((application, index) => (
        <div
          className="card w-full mb-3 cursor-pointer hover:bg-slate-200 active:hover:bg-slate-400"
          key={index}
          onClick={() => handleGetJob(application.job_id)}
        >
          <p className=" tracking-wider text-xl">Title: {application.title}</p>
          <p className=" tracking-wider ">
            Application Status:{" "}
            <span
              className={
                application.applicationStatus === "Pending" && "text-yellow-500"
              }
            >
              {application.applicationStatus}
            </span>
          </p>
        </div>
      ))}
    </>
  );
};

export default JobsListing;
