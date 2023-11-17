import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Link } from "react-router-dom";
import { loadingRequest, loadingSuccess } from "../../reducers/uiLoaderReducer";
import { filterCompaniesCategories } from "../../Actions/CompaniesActions";
import CompanyDetailsCard from "../companiesPage/companyDetailsCard";
import { companyCategories } from "../../Constants/NavbarElements";
import { AiFillCaretDown } from "react-icons/ai";

interface Company {
  _id: string;
  name: string;
}

interface RootState {
  companies: { companies: Company[] };
 }

const CompaniesSection = () => {
  const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();

  const { companies } = useSelector((state: RootState) => state.companies);

  const handleCompaniesFilter = (category: string, i: number) => {
    if (i != 0) {
      dispatch(loadingRequest());
      setTimeout(() => {
        dispatch(filterCompaniesCategories(category));
        dispatch(loadingSuccess());
      }, 500);
    } else {
      dispatch(loadingRequest());
      setTimeout(() => {
        dispatch(filterCompaniesCategories(category));
        dispatch(loadingSuccess());
      }, 500);
    }
  };
  return (
    <div
      className={`md:w-[1128px] w-full mx-auto flex items-start justify-center flex-col`}
    >
      <p className="text-bold text-lg md:text-2xl font-bold text-black mb-4">
        {companies && companies.length} Companies
      </p>
      <ul className="flex items-start gap-3 py-auto flex-wrap justify-start">
        {companyCategories.map((category, i) => (
          <li
            className=" hover:bg-slate-300 text-sm flex uppercase items-center justify-between bg-white ring-[1px] ring-zinc-300 rounded-xl py-1 px-3 mr-2 cursor-pointer"
            key={i}
            onClick={() => handleCompaniesFilter(category.label, i)}
          >
            {category.label}
            <AiFillCaretDown className="ml-2 text-xs" />
          </li>
        ))}
      </ul>
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
  );
};

export default CompaniesSection;
