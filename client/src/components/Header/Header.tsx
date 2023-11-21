import React, { useEffect, useState } from "react";
import Logo from "../../assets/naukri_Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import {
  companyCategories,
  jobsCategories,
} from "../../Constants/NavbarElements";
import { filterCompaniesCategories } from "../../Actions/CompaniesActions";
import { loadingRequest, loadingSuccess } from "../../reducers/uiLoaderReducer";
import { setSearchQuery } from "../../Actions/searchAction";
import { userLogout } from "../../Actions/UserSignUp";

interface User {
    name: string;
    isAuthenticated: boolean;
    // Add other properties as needed
}
   
interface State {
    user: User;
    isAuthenticated: boolean;
    // Add other properties as needed
}
   
const Header = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { user, isAuthenticated }: User & { isAuthenticated: boolean } = useSelector((state: State) => state);

  //nav menus
  useEffect(() => {
    if (!isAuthenticated) {
      navigation("/");
    }
  }, []);

  const handleCompanyNav = (category: string) => {
    dispatch(loadingRequest());
    setTimeout(() => {
      dispatch(filterCompaniesCategories(category));
      dispatch(loadingSuccess());
      navigation("/companies");
    }, 500);
  };

  const [searchText, setSearchText] = useState("");
  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // Dispatch action to set search query in Redux store
      dispatch(setSearchQuery(searchText));

      // Navigate to search results page
      navigation("/search");
      setSearchText("");
    }
  };
  const handleLogout = () => {
    dispatch(userLogout());
    navigation("/");
   };
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  // Inside the component
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSearchOpen(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [isJobsDropdownOpen, setIsJobsDropdownOpen] = useState(false);
  const [isCompanyCategoriesDropdownOpen, setIsCompanyCategoriesDropdownOpen] =
    useState(false);

  const toggleJobsDropdown = () => {
    setIsJobsDropdownOpen(!isJobsDropdownOpen);
    setIsCompanyCategoriesDropdownOpen(false);
  };

  const toggleCompanyCategoriesDropdown = () => {
    setIsJobsDropdownOpen(false);
    setIsCompanyCategoriesDropdownOpen(!isCompanyCategoriesDropdownOpen);
  };
  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to={"/home"} className="flex items-center">
          <img src={Logo} className="h-5 mr-3" alt="Logo" />
        </Link>
        <div
          className={`fixed top-24 -translate-x-1/2  left-1/2 md:relative md:translate-x-0 md:top-auto md:left-auto  ${
            isSearchOpen ? "block" : "hidden"
          }`}
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
        </div>
        <div className="flex">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            type="button"
            className="md:hidden text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 text-sm p-2.5 mr-1 rounded-lg"
            aria-controls="navbar-search"
            aria-expanded={isSearchOpen}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            <li className="relative cursor-pointer">
              <button
                id="dropdownNavbarLink"
                onClick={toggleJobsDropdown}
                className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto"
              >
                Jobs
                <svg
                  className={`w-2.5 h-2.5 ml-2.5 ${
                    isJobsDropdownOpen ? "transform rotate-180" : ""
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="dropdownNavbar"
                className={`z-10 ${
                  isJobsDropdownOpen ? " absolute top-10" : "hidden"
                } font-normal bg-white ring-slate-300 ring-1 divide-y divide-gray-100 rounded-lg shadow w-44`}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-400"
                  aria-labelledby="dropdownNavbarLink"
                >
                  {jobsCategories &&
                    jobsCategories.map((category, i) => (
                      <li key={i}>
                        <Link
                          to={category.href}
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          {category.label}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </li>
            <li className="relative cursor-pointer">
              <button
                id="dropdownNavbarLink"
                onClick={toggleCompanyCategoriesDropdown}
                className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto"
              >
                Categories
                <svg
                  className={`w-2.5 h-2.5 ml-2.5 ${
                    isCompanyCategoriesDropdownOpen
                      ? "transform rotate-180"
                      : ""
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="dropdownNavbar"
                className={`z-10 ${
                  isCompanyCategoriesDropdownOpen
                    ? " absolute top-10 md:-translate-x-1/2"
                    : "hidden"
                } font-normal bg-white ring-slate-300 ring-1 divide-y divide-gray-100 rounded-lg shadow w-44`}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-400"
                  aria-labelledby="dropdownNavbarLink"
                >
                  {companyCategories &&
                    companyCategories.map((category, i) => (
                      <li
                        key={i}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => handleCompanyNav(category, i)}
                      >
                        {category.label}
                      </li>
                    ))}
                </ul>
              </div>
            </li>
            <li>
              <Link
                to="/profile"
                title={user && user.name}
                className="block py-2 pl-3 pr-4 md:px-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                <FaUserCircle id="profile-icon" size={24} />
              </Link>
            </li>
            <li className="block py-2 pl-3 pr-4 md:px-0  text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
              <button
                onClick={() => handleLogout()}
                className="flex p-0 m-0 items-center justify-center flex-col rotate-180 decoration-none"
              >
                <BiLogOut id="profile-icon" size={24} />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
