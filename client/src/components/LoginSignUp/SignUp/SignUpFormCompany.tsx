import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, registerCompany } from "../../../Actions/UserSignUp";
import {
  categoriesConstant,
  departmentsConstant,
} from "../../../Constants/GeneralConstants";
import { AiFillCloseCircle } from "react-icons/ai";

const SignUpForm = () => {
  const dispatch = useDispatch();
  //set data from state

  const { error, isAuthenticated } = useSelector((state) => state.user);

  //result message
  const [message, setMessage] = useState("");
  const [messageT, setMessageT] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState([]);

  // message
  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 5000);
  }, [message]);

  //setMessage
  useEffect(() => {
    if (error) {
      console.log("error:", error);
      setMessage(error);
      setMessageT("text-red-500 font-bold");
      dispatch(clearErrors());
    }
    if (isAuthenticated == true) {
      setMessageT("text-green-500 font-bold");
      setMessage("SignUp Successfully");
    }
  }, [dispatch, error, isAuthenticated]);

  //user data
  const [user, setUser] = useState({
    name: "",
    email: "",
    location: "",
    password: "",
    description: "",
    companySize: "",
    companyCategories: "",
  });

  const { name, email, password, description, location, companySize } = user;

  //On change values
  const registerCompanyDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // register HandleSignUpSubmit
  const registerCompanySubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("role", "company");
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("location", location);
    myForm.set("password", password);
    myForm.set("description", description);
    myForm.set("companySize", companySize);

    // Set companyCategories directly from selectedCategories
    selectedCategories.forEach((category) => {
      myForm.append("companyCategories[]", category);
    });

    // Set companyDepartments directly from selectedDepartments
    selectedDepartments.forEach((department) => {
      myForm.append("companyDepartments[]", department);
    });

    dispatch(registerCompany(myForm));
  };

  // console.log(selectedCategories);
  // console.log(user);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    if (event.target.value === "") return;
    setSelectedCategories([...selectedCategories, event.target.value]);
  };
  const handleRemoveCategory = (e, category) => {
    e.preventDefault();
    const newSelectedCategories = selectedCategories.filter(
      (c) => c !== category
    );
    setSelectedCategories(newSelectedCategories);
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
    if (event.target.value === "") return;
    setSelectedDepartments([...selectedDepartments, event.target.value]);
  };
  const handleRemoveDepartment = (e, department) => {
    e.preventDefault();
    const newSelectedDepartments = selectedDepartments.filter(
      (d) => d !== department
    );
    setSelectedDepartments(newSelectedDepartments);
  };

  return (
    <>
      <p className=" text-2xl pt-5 font-bold pb-[2rem]">
        Join Us and Find a Best Contributors
      </p>
      <form
        className="w-full  mx-auto"
        onSubmit={(e) => registerCompanySubmit(e)}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="name"
            >
              Company Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="name"
              name="name"
              type="text"
              placeholder="What is your Company name?"
              required
              value={name}
              onChange={registerCompanyDataChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="location"
            >
              Location
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="location"
              type="text"
              name="location"
              placeholder="What is your location?"
              required
              value={location}
              onChange={registerCompanyDataChange}
            />
          </div>
          <div className="w-full px-3  mb-6  md:mt-6">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900"
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
              onChange={registerCompanyDataChange}
            />
          </div>

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 md:mt-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="companyCategory"
            >
              Company Category
            </label>
            <select
              id="companyCategory"
              name="companyCategory"
              required
              className="cursor-pointer appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option className="cursor-pointer" value="">
                Select a category
              </option>
              {categoriesConstant.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 md:mt-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="selectedCategories"
            >
              Selected Category
            </label>
            <div className="flex flex-wrap -mx-3 mb-6">
              {selectedCategories.length > 0 ? (
                selectedCategories.map((select) => (
                  <button
                    key={select}
                    onClick={(e) => handleRemoveCategory(e, select)}
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
                  No Category Selected
                </p>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/2 px-3 md:mb-0 md:mt-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="companyDepartment"
            >
              Company Departments
            </label>
            <select
              id="companyDepartment"
              name="companyDepartment"
              required
              className="cursor-pointer appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              value={selectedDepartment}
              onChange={handleDepartmentChange}
            >
              <option className="cursor-pointer" value="">
                Select a department
              </option>
              {departmentsConstant.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/2 px-3 md:mb-0 md:mt-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="selectedDepartments"
            >
              Selected Departments
            </label>
            <div className="flex flex-wrap -mx-3 mb-6">
              {selectedDepartments.length > 0 ? (
                selectedDepartments.map((department) => (
                  <button
                    key={department}
                    onClick={(e) => handleRemoveDepartment(e, department)}
                    className="bg-gray-200 cursor-pointer relative text-gray-700 border border-gray-200 rounded me-2 mb-2 py-3 px-4 leading-tight hover:outline-none hover:bg-white hover:border-gray-500 group"
                  >
                    {department}
                    <AiFillCloseCircle
                      className="text-red-700 hidden group-hover:block absolute -top-2 -right-2"
                      size={20}
                    />
                  </button>
                ))
              ) : (
                <p className="bg-gray-200 text-gray-700 border border-gray-200 rounded me-2 mb-2 py-3 px-4 leading-tight">
                  No Department Selected
                </p>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/2 px-3 md:mt-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="email"
            >
              Email ID
            </label>
            <input
              type="email"
              id="email"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="Tell us your email ID"
              required
              name="email"
              value={email}
              onChange={registerCompanyDataChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 md:mt-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="companySize"
            >
              Company Size
            </label>
            <input
              type="number"
              min={1}
              id="companySize"
              className="PhoneNumber appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="Tell us your company size..."
              required
              name="companySize"
              value={companySize}
              onChange={registerCompanyDataChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="password"
              type="password"
              placeholder="xxxxxxxxxxxxxxxx"
              required
              name="password"
              minLength={8}
              value={password}
              onChange={registerCompanyDataChange}
            />
            <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-3/4 px-3 flex items-center">
            <input
              defaultChecked=""
              id="checked-checkbox"
              type="checkbox"
              defaultValue=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="checked-checkbox"
              className="ml-2 text-sm font-bold text-gray-900 "
            >
              Send me important updates on Email
            </label>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block  tracking-wide text-sm font-semibold mb-3 text-gray-400">
              By clicking Register, you agree to the{" "}
              <span className="font-bold text-sky-600">
                Terms and Conditions
              </span>{" "}
              & <span className="font-bold text-sky-600">Privacy Policy</span>{" "}
              of Naukri.com
            </label>
            <button
              type="submit"
              id="grip-register-btn"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Register new account
            </button>
          </div>
        </div>
      </form>
      <p className={`text-center h-[20px] py-5 ${messageT}`}>{message}</p>
    </>
  );
};

export default SignUpForm;

// title,
// description,
// location,
// department,
// requirement,
// salary,
// experience,
// vacancies,
// hiring_status
