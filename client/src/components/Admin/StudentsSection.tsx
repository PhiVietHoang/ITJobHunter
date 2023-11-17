import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent, getAllStudentsInfo } from "../../Actions/UserSignUp";
import { FaUser, FaCheck, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "../../Actions/searchAction";

const StudentsSection = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { users } = useSelector((state) => state.users);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (!users || users.length <= 0) {
      dispatch(getAllStudentsInfo());
    }
  }, []);
  //functions
  const handleStudentInfo = (student_id) => {
    navigation(`/userInfo/${student_id}`);
  };

  const handleDeleteStudent = async (student_id) => {
    await dispatch(deleteStudent(student_id));
  };
  const handleSearch = async () => {
    await dispatch(getAllStudentsInfo());
  };
  return (
    <div className="p-4">
      <div className="flex items-center text-xl mb-4 font-semibold gap-4 flex-wrap justify-start w-full">
        <h2 className=" underline">Students List</h2>
        <button
          onClick={handleSearch}
          className=" hover:bg-slate-300 text-sm flex items-center justify-between bg-white ring-[1px] ring-zinc-300 rounded-xl py-1 px-3 mr-2 cursor-pointer"
        >
          Get all Students
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users &&
          users.map((user, i) => (
            <div
              key={user._id}
              className="bg-white w-[300px] cursor-pointer  rounded-lg p-4 shadow-md flex items-start justify-start flex-col"
            >
              <div className="flex items-center w-full justify-between">
                <h3
                  className="text-lg font-semibold hover:underline"
                  onClick={() => handleStudentInfo(user._id)}
                >
                  {user.name}
                </h3>
                <FaTrash
                  className="hover:text-red-500"
                  onClick={() => handleDeleteStudent(user._id)}
                />
              </div>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm mt-2 flex items-center">
                Role:{" "}
                {user.role === "student" ? (
                  <>
                    <FaUser className="inline text-green-500 mx-2" /> Student
                  </>
                ) : (
                  "Unknown"
                )}
              </p>
              <p className="text-sm  flex items-center">
                Status: <FaCheck className="inline text-green-500 mx-2" />{" "}
                Approved
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default StudentsSection;
