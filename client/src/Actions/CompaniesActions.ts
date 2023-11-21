import axios, { AxiosError } from "axios";
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
// const BASE_URL = "http://localhost:8080/api/v1";
const BASE_URL = "https://crm-backend-system-employee-hiring.onrender.com/api/v1";

import {
   LOAD_COMPANIES_REQUEST,
   LOAD_COMPANIES_SUCCESS,
   LOAD_COMPANIES_FAIL,
   GET_COMPANY_DETAILS_REQUEST,
   GET_COMPANY_DETAILS_SUCCESS,
   GET_COMPANY_DETAILS_FAIL,
   FILTER_COMPANIES_REQUEST,
   FILTER_COMPANIES_SUCCESS,
   FILTER_COMPANIES_FAIL,
   GET_COMPANIES_DETAILS_REQUEST,
   GET_COMPANIES_DETAILS_SUCCESS,
   GET_COMPANIES_DETAILS_FAIL,
   UPDATE_COMPANY_REQUEST,
   UPDATE_COMPANY_SUCCESS,
   UPDATE_COMPANY_FAIL,
   CLEAR_ERRORS,
} from "../Constants/CompanyConstants";

// Clearing Errors
export const clearErrors = () => async (dispatch: any) => {
   dispatch({ type: CLEAR_ERRORS });
};


// update company Details
export const updateCompanyDetails = (companyDetails: any) => async (dispatch: any) => {
   try {
      // Dispatch request
      dispatch({ type: UPDATE_COMPANY_REQUEST });

      let Link = BASE_URL + `/update/details`;
      if (!companyDetails) return;
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(Link, companyDetails, config);
      dispatch({ type: UPDATE_COMPANY_SUCCESS, payload: data.company });
   } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.log("Error", axiosError);
        // Response Failure
        dispatch({ type: UPDATE_COMPANY_FAIL, payload: (axiosError.response?.data as any)?.message });
      }
   }
};

// Load Companies
export const LoadCompanies = (): ThunkAction<void, {}, {}, AnyAction> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
   try {
      // Dispatch request
      dispatch({ type: LOAD_COMPANIES_REQUEST });

      // Requesting  Data from db
      const { data } = await axios.get(BASE_URL + `/companies`,);
      dispatch({ type: LOAD_COMPANIES_SUCCESS, payload: data.companies });
   } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.log("Error", error);
        // Response Failure
        dispatch({ type: LOAD_COMPANIES_FAIL, payload: (axiosError.response?.data as any)?.message });
      }
        
   }
};

// filter Companies
export const searchCompanies = (keyword: string) => async (dispatch: any) => {
   try {
      // Dispatch request
      dispatch({ type: GET_COMPANIES_DETAILS_REQUEST });

      let Link = BASE_URL + `/companies`;
      if (keyword) Link += `?keyword=${keyword}`;


      // Requesting  Data from db
      const { data } = await axios.get(Link);

      dispatch({ type: GET_COMPANIES_DETAILS_SUCCESS, payload: data.companies });
   } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.log("Error", error);
        // Response Failure
        dispatch({ type: GET_COMPANIES_DETAILS_FAIL, payload: (axiosError.response?.data as any)?.message });
      }
   }
};

//get Company Details
export const getCompanyDetails = (company_id: string) => async (dispatch: any) => {
   try {
      // Dispatch request
      dispatch({ type: GET_COMPANY_DETAILS_REQUEST });

      // console.log(company_id);
      // Requesting  Data from db
      let Link = BASE_URL + "/company/details/";
      if (!company_id) return;
      Link += `${company_id}`;
      // console.log(Link)
      const { data } = await axios.get(Link);
      // console.log(data);

      dispatch({ type: GET_COMPANY_DETAILS_SUCCESS, payload: data.company });
   } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.log("Error", error);
        // Response Failure
        dispatch({ type: GET_COMPANY_DETAILS_FAIL, payload: (axiosError.response?.data as any)?.message });
      }
   }
};

export const filterCompaniesCategories = (category: string): ThunkAction<void, {}, {}, AnyAction> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
   try {
      // Dispatch request
      dispatch({ type: FILTER_COMPANIES_REQUEST });

      // Requesting  Data from db
      let Link = BASE_URL + `/companies`
      if (category) {
         Link += `?companyCategories=${category}`
      }
      const { data } = await axios.get(Link);

      dispatch({ type: FILTER_COMPANIES_SUCCESS, payload: data.companies });

   } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.log("Error", error);
        // Response Failure
        dispatch({ type: FILTER_COMPANIES_FAIL, payload: (axiosError.response?.data as any)?.message });
      }
   }
};

export const searchCompaniesName = (name: string) => async (dispatch: any) => {
   try {
      // Dispatch request
      dispatch({ type: GET_COMPANIES_DETAILS_REQUEST });

      // Requesting  Data from db
      let Link = BASE_URL + `/companies`
      if (name) {
         Link += `?name=${name}`
      }
      const { data } = await axios.get(Link);

      dispatch({ type: GET_COMPANIES_DETAILS_SUCCESS, payload: data.companies });

   } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.log("Error", error);
        // Response Failure
        dispatch({ type: GET_COMPANIES_DETAILS_FAIL, payload: (axiosError.response?.data as any)?.message });
      }
   }
};