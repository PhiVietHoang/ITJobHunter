import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getStudentInfo } from "../../Actions/studentProfileAction";
import {
  FaEnvelope,
  FaUserCircle,
  FaCalendarAlt,
  FaBriefcase,
} from "react-icons/fa";
import { HiStatusOnline } from "react-icons/hi";

import Loader from "../Loader";
import Header from "../Header/Header";

const UserInfo = () => {
  const { student_id } = useParams();
  const { student, studentProfileLoading } = useSelector(
    (state) => state.studentProfile
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudentInfo(student_id));
  }, [dispatch, student_id]);

  return (
    <>
      {studentProfileLoading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="md:w-[1128px] min-h-[80vh] mt-[100px] w-full mx-auto flex items-center flex-col justify-start px-3 mb-4 ">
            {student && (
              <div className="bg-white w-full md:w-[600px] shadow-lg rounded-lg  p-4">
                <h2 className="text-2xl font-semibold mb-4">
                  <FaUserCircle className="inline-block mr-2" />
                  {student.name}
                </h2>
                <p className="text-gray-600 mb-2">
                  <FaEnvelope className="inline-block mr-2" />
                  Email: {student.email}
                </p>
                <p className="text-gray-600 mb-2">
                  <HiStatusOnline className="inline-block mr-2" />
                  User Status:{" "}
                  <span
                    className={`${
                      student.userStatus === "approved"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {student.userStatus}
                  </span>
                </p>
                <p className="text-gray-600 mb-2">
                  <FaUserCircle className="inline-block mr-2" />
                  Role: {student.role}
                </p>
                <p className="text-gray-600 mb-2">
                  <FaBriefcase className="inline-block mr-2" />
                  Applied Jobs:{" "}
                  {student.appliedJobs && student.appliedJobs.length}
                </p>
                <p className="text-gray-600">
                  <FaCalendarAlt className="inline-block mr-2" />
                  Joined: {new Date(student.createdAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default UserInfo;
