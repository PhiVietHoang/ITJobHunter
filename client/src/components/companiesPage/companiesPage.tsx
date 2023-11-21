import React, { useEffect } from "react";
import Loader from "../Loader";
import Header from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ScrollToTop from "../../Utils/ScrollToTop";
import CompanyDetailsCard from "./companyDetailsCard";
import { companyCategories } from "../../Constants/NavbarElements";
import { filterCompaniesCategories } from "../../Actions/CompaniesActions";
import { loadingRequest, loadingSuccess } from "../../Reducers/uiLoaderReducer";

const CompaniesPage = () => {
  useEffect(() => {
    ScrollToTop();
  }, []);

  const { companiesLoading, companies } = useSelector(
    (state) => state.companies
  );
  const { uiLoader } = useSelector((state) => state.uiLoader);
  const dispatch = useDispatch();

  const handleCompaniesFilter = (category, i) => {
    if (i != 0) {
      dispatch(loadingRequest());
      setTimeout(() => {
        dispatch(filterCompaniesCategories(category));
        dispatch(loadingSuccess());
      }, 500);
    } else {
      dispatch(loadingRequest());
      setTimeout(() => {
        dispatch(filterCompaniesCategories());
        dispatch(loadingSuccess());
      }, 500);
    }
  };
  return (
    <>
      {companiesLoading || uiLoader ? (
        <Loader />
      ) : (
        <div className="">
          <Header />
          <div className="min-h-[90vh] mb-[100px]">
            <div className="bg-white header mb-4  mt-[80px]">
              <div className="md:w-[1128px] py-4 text-sm md:text-lg font-bold w-ful px-4 mx-auto flex items-center gap-3 py-auto flex-wrap justify-start">
                <p>{companies && companies.length} Companies</p>
                <ul className="flex items-start gap-3 py-auto flex-wrap justify-start">
                  {companyCategories.map((category, i) => (
                    <li
                      className="text-xs ring-[1px] cursor-pointer ring-zinc-300 rounded-xl py-1 px-3 hover:bg-gray-300 hover:text-gray-800 text-gray-500"
                      key={i}
                      onClick={() => handleCompaniesFilter(category.label, i)}
                    >
                      {category.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:w-[1128px] w-ful mx-auto flex items-start flex-col justify-start mb-4 px-4">
              {companies.length > 0 ? (
                companies.map((company, i) => (
                  <Link key={i} to={`/company/${company._id}`}>
                    <div className="card w-full md:w-[700px] mt-4 ">
                      <CompanyDetailsCard company={company} />
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-bold text-lg text-black mt-4">
                  Companies Not available,{" "}
                  <button
                    className="underline text-blue-600 hover:text-blue-800"
                    onClick={() => handleCompaniesFilter("category", 0)}
                  >
                    try again
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CompaniesPage;
