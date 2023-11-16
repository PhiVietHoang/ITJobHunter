import axios, { AxiosError } from "axios";
// const BASE_URL = "http://localhost:8080/api/v1";
const BASE_URL = "https://crm-backend-system-employee-hiring.onrender.com/api/v1";


import {
   LOAD_JOB_APPLICATIONS_REQUEST,
   LOAD_JOB_APPLICATIONS_SUCCESS,
   LOAD_JOB_APPLICATIONS_FAIL,
   UPDATE_JOB_APPLICATIONS_REQUEST,
   UPDATE_JOB_APPLICATIONS_SUCCESS,
   UPDATE_JOB_APPLICATIONS_FAIL,
   CLEAR_ERRORS,
   JOB_APPLICATIONS_REQUEST,
   JOB_APPLICATIONS_SUCCESS,
   JOB_APPLICATIONS_FAIL,
   GET_JOB_APPLICATIONS_BY_COMPANY_NAME_REQUEST,
   GET_JOB_APPLICATIONS_BY_COMPANY_NAME_SUCCESS,
   GET_JOB_APPLICATIONS_BY_COMPANY_NAME_FAIL,
   DELETE_JOB_APPLICATIONS_ID_REQUEST,
   DELETE_JOB_APPLICATIONS_ID_SUCCESS,
   DELETE_JOB_APPLICATIONS_ID_FAIL,
} from "../Constants/JobApplicationConstants";

// Clearing Errors
export const clearErrors = () => async (dispatch: any) => {
   dispatch({ type: CLEAR_ERRORS });
};

export const deleteApplicationById = (application_id: string) => async (dispatch: any) => {
   try {
      // Dispatch request
      dispatch({ type: DELETE_JOB_APPLICATIONS_ID_REQUEST });
      // Requesting to Backend
      // Requesting  Data
      const { data } = await axios.delete(BASE_URL + `/delete/job/application/${application_id}`);

      dispatch({ type: DELETE_JOB_APPLICATIONS_ID_SUCCESS, payload: data });
   } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.log("Error", axiosError);
        // Response Failure
        dispatch({ type: DELETE_JOB_APPLICATIONS_ID_FAIL, payload: (axiosError.response?.data as any)?.message });
      }
   }
};

// Load Jobs
export const LoadJobsApplications = () => async (dispatch: any) => {
   try {
      // Dispatch request
      dispatch({ type: LOAD_JOB_APPLICATIONS_REQUEST });
      let Link = BASE_URL + `/company/job/applications`;

      // Requesting  Data from db
      const { data } = await axios.get(Link);

      dispatch({ type: LOAD_JOB_APPLICATIONS_SUCCESS, payload: data.applications });
   } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.log("Error", axiosError);
        // Response Failure
        dispatch({ type: LOAD_JOB_APPLICATIONS_FAIL, payload: (axiosError.response?.data as any)?.message });
      }
   }
};

// get Jobs by application status 
export const getJobsApplicationsByApplicationStatus = (applicationStatus: string) => async (dispatch: any) => {
   try {
      // Dispatch request
      dispatch({ type: JOB_APPLICATIONS_REQUEST });
      let Link = BASE_URL + `/company/job/applications`;
      if (applicationStatus) Link += `?applicationStatus=${applicationStatus}`

      // Requesting  Data from db
      const { data } = await axios.get(Link);
      dispatch({ type: JOB_APPLICATIONS_SUCCESS, payload: data.applications });
   } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.log("Error", axiosError);
        // Response Failure
        dispatch({ type: JOB_APPLICATIONS_FAIL, payload: (axiosError.response?.data as any)?.message });
      }
   }
};

// get Jobs by application jobs 
export const getJobsApplicationsByJobsTitle = (title: string) => async (dispatch: any) => {
   try {
      // Dispatch request
      dispatch({ type: JOB_APPLICATIONS_REQUEST });
      let Link = BASE_URL + `/company/job/applications`;
      if (title) Link += `?title=${title}`

      // Requesting  Data from db
      const { data } = await axios.get(Link);
      dispatch({ type: JOB_APPLICATIONS_SUCCESS, payload: data.applications });
   } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.log("Error", axiosError);
        // Response Failure
        dispatch({ type: JOB_APPLICATIONS_FAIL, payload: (axiosError.response?.data as any)?.message });
      }
   }
};

// get Jobs by application company
export const getJobsApplicationsByCompanyName = (company_name: string) => async (dispatch: any) => {
   try {
      // Dispatch request
      dispatch({ type: GET_JOB_APPLICATIONS_BY_COMPANY_NAME_REQUEST });
      let Link = BASE_URL + `/company/job/applications`;
      if (company_name) Link += `?company_name=${company_name}`

      // Requesting  Data from db
      const { data } = await axios.get(Link);

      dispatch({ type: GET_JOB_APPLICATIONS_BY_COMPANY_NAME_SUCCESS, payload: data.applications });
   } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.log("Error", axiosError);
        // Response Failure
        dispatch({ type: GET_JOB_APPLICATIONS_BY_COMPANY_NAME_FAIL, payload: (axiosError.response?.data as any)?.message });
      }
   }
};



// update Job Application
export const updateJobApplication = (applicationData: string) => async (dispatch: any) => {
   try {
      // Dispatch request
      dispatch({ type: UPDATE_JOB_APPLICATIONS_REQUEST });

      let Link = BASE_URL + `/company/update/jobApplication`;
      const config = { headers: { "Content-Type": "application/json" } };

      // Requesting  Data from db
      const { data } = await axios.put(Link, applicationData, config);

      dispatch({ type: UPDATE_JOB_APPLICATIONS_SUCCESS, payload: data.application });
   } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.log("Error", axiosError);
        // Response Failure
        dispatch({ type: UPDATE_JOB_APPLICATIONS_FAIL, payload: (axiosError.response?.data as any)?.message });
      }
   }
};


