import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import experienced from "../../../assets/experienced-login.svg";
import fresher from "../../../assets/schoolbag-login.svg";
import { clearErrors, registerStudent } from "../../../Actions/UserSignUp";

const SignUpStudent = () => {
  const dispatch = useDispatch();
  // date from state
  const { error, isAuthenticated } = useSelector((state) => state.user);

  //work status
  const [experienceStatus, setExperienceStatus] = useState(false);
  const [fresherStatus, setFresherStatus] = useState(false);

  //result message
  const [message, setMessage] = useState("");
  const [messageTheme, setMessageTheme] = useState("");

  //send email
  const [emailUpdates, setEmailUpdates] = useState(false);

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
      setMessageTheme("text-red-500 font-bold");
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (isAuthenticated) {
      setMessage("Student Registered Successfully");
      setMessageTheme("text-green-500 font-bold");
    }
  }, [isAuthenticated]);

  //get Student data from from
  const [student, setStudent] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = student;

  //On change values
  const StudentDataChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  //student data
  const signUpStudent = (e) => {
    e.preventDefault();

    //create Form using formData API
    let myForm = new FormData();

    // adding student data in form
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("role", "student");

    // Call sendEmail if emailUpdates is true
    // if (emailUpdates) {
    //   sendEmail();
    // }

    //call register
    dispatch(registerStudent(myForm));
  };

  // handle work status
  const handleExperience = (e) => {
    e.preventDefault();
    setExperienceStatus(true);
    setFresherStatus(false);
  };
  const handleFresher = (e) => {
    e.preventDefault();
    setFresherStatus(true);
    setExperienceStatus(false);
  };

  return (
    <>
      <p className=" text-2xl font-bold pt-5 pb-[2rem]">
        Find a job & grow your career
      </p>
      <form className="w-full  mx-auto" onSubmit={(e) => signUpStudent(e)}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="name"
              type="text"
              name="name"
              placeholder="What is your full name?"
              required
              value={name}
              onChange={StudentDataChange}
            />
          </div>
          <div className="w-full md:w-full px-3 mb-6  md:mt-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="email"
            >
              Email ID
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="Tell us your email ID"
              required
              value={email}
              onChange={StudentDataChange}
            />
          </div>
          <div className="w-full px-3  ">
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
              placeholder="XXXXXXXXXXXXX"
              required
              name="password"
              value={password}
              minLength={8}
              onChange={StudentDataChange}
            />
            <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-Work-status"
            >
              Work status
            </label>
            <div className="flex items-center justify-between">
              <a
                id="grid-Work-Experience"
                className={`cursor-pointer active:bg-white transition-all focus:border-gray-500 duration-300 w-[45%] rounded-2xl flex items-center justify-between appearance-none   bg-gray-200 text-gray-700 border border-gray-200 py-3 px-4 mb-3 leading-tight ${
                  experienceStatus ? "border-gray-500" : "focus:outline-none"
                }  focus:bg-white`}
                required
                onClick={(e) => handleExperience(e)}
              >
                <div className="me-2">
                  <p className="font-bold text-sm">I'm experienced</p>
                  <p className=" text-xs text-gray-500">
                    I have work experience (excluding internships)
                  </p>
                </div>
                <img src={experienced} alt="experienced logo" />
              </a>
              <a
                className={`cursor-pointer active:bg-white transition-all focus:border-gray-500 duration-300 w-[45%] rounded-2xl flex items-center justify-between appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight ${
                  fresherStatus ? "border-gray-500" : "focus:outline-none"
                } focus:bg-white focus:border-gray-500`}
                id="grid-Work-Fresher"
                required
                onClick={(e) => handleFresher(e)}
              >
                <div className="me-2">
                  <p className="font-bold text-sm">I'm a fresher</p>
                  <p className=" text-xs text-gray-500">
                    I am a student / Haven't worked after graduation
                  </p>
                </div>
                <img src={fresher} alt="experienced logo" />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-3/4 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="file_input"
            >
              Resume
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-200 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="file_input_help"
              id="file_input"
              type="file"
            />
            <p className="mt-1 text-xs text-gray-500" id="file_input_help">
              DOC, DOCx, PDF, RTF | Max: 2 MB
            </p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-3/4 px-3 flex items-center">
            <input
              defaultChecked={emailUpdates}
              id="checked-checkbox"
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
              onChange={(e) => setEmailUpdates(e.target.checked)}
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
      <p className={`text-center h-[20px] py-5 ${messageTheme}`}>{message}</p>
    </>
  );
};

export default SignUpStudent;
