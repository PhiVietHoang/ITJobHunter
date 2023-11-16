import axios, { AxiosError } from "axios";
// const BASE_URL = "http://localhost:8080/api/v1";
const BASE_URL = "https://crm-backend-system-employee-hiring.onrender.com/api/v1";

import {
   JOB_REQUEST,
   JOB_SUCCESS,
   JOB_FAIL,
   LOAD_JOBS_REQUEST,
   LOAD_JOBS_SUCCESS,
   LOAD_JOBS_FAIL,
   APPLY_JOB_REQUEST,
   APPLY_JOB_SUCCESS,
   APPLY_JOB_FAIL,
   DELETE_JOB_REQUEST,
   DELETE_JOB_SUCCESS,
   DELETE_JOB_FAIL,
   GET_JOBS_REQUEST,
   GET_JOBS_SUCCESS,
   CREATE_JOB_REQUEST,
   CREATE_JOB_SUCCESS,
   CREATE_JOB_FAIL,
   UPDATE_JOB_REQUEST,
   UPDATE_JOB_SUCCESS,
   UPDATE_JOB_FAIL,
   GET_JOBS_FAIL,
   DELETE_JOB_APPLICATIONS_REQUEST,
   DELETE_JOB_APPLICATIONS_SUCCESS,
   DELETE_JOB_APPLICATIONS_FAIL,
   CLEAR_ERRORS,
} from "../Constants/JobConstants";

// Clearing Errors
export const clearErrors = () => async (dispatch: any) => {
   dispatch({ type: CLEAR_ERRORS });
};

export const createJob = (JobData: string) => async (dispatch: any) => {
   try {
      // console.log(JobData);
      dispatch({ type: CREATE_JOB_REQUEST });

      let Link = BASE_URL + "/company/create/job";
      const config = { headers: { "Content-Type": "application/json" } };
      if (!JobData) return;

      // Requesting  Data from db
      const { data } = await axios.post(Link, JobData, config);
      dispatch({ type: CREATE_JOB_SUCCESS, payload: data.job });

   } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.log("Error", axiosError);
        // Response Failure
        dispatch({ type: CREATE_JOB_FAIL, payload: (axiosError.response?.data as any)?.message });
      }
   }
}

export const UpdateJob = (JobData: string) => async (dispatch: any) => {
   try {
      console.log(JobData);
      dispatch({ type: UPDATE_JOB_REQUEST });

      let Link = BASE_URL + "/company/update/job";
      const config = { headers: { "Content-Type": "application/json" } };
      if (!JobData) return;

      // Requesting  Data from db
      const { data } = await axios.put(Link, JobData, config);
      dispatch({ type: UPDATE_JOB_SUCCESS, payload: data.job });

   } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.log("Error", axiosError);
        // Response Failure
        dispatch({ type: UPDATE_JOB_FAIL, payload: (axiosError.response?.data as any)?.message });
      }
   }
}

// Load Jobs
export const LoadJobs = () => async (dispatch: any) => {
   try {
      // Dispatch request
      dispatch({ type: LOAD_JOBS_REQUEST });

      let Link = BASE_URL + `/jobs`;

      // Requesting  Data from db
      const { data } = await axios.get(Link);
      dispatch({ type: LOAD_JOBS_SUCCESS, payload: data.jobs });
   } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.log("Error", axiosError);
        // Response Failure
        dispatch({ type: LOAD_JOBS_FAIL, payload: (axiosError.response?.data as any)?.message });
      }
   }
};

// filter Jobs
export const searchJobs = (keyword: string) => async (dispatch: any) => {
   try {
      // Dispatch request
      dispatch({ type: GET_JOBS_REQUEST });

      let Link = BASE_URL + `/jobs`;
      if (keyword) Link += `?keyword=${keyword}`;


      // Requesting  Data from db
      const { data } = await axios.get(Link);

      dispatch({ type: GET_JOBS_SUCCESS, payload: data.jobs });
   } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.log("Error", axiosError);
        // Response Failure
        dispatch({ type: GET_JOBS_FAIL, payload: (axiosError.response?.data as any)?.message });
      }
   }
};

// filter Jobs By Location
export const filterJobsByLocation = (keyword: string) => async (dispatch: any) => {
   try {
      // Dispatch request
      dispatch({ type: LOAD_JOBS_REQUEST });

      let Link = BASE_URL + `/jobs`;
      if (keyword) Link += `?location=${keyword}`;


      // Requesting  Data from db
      const { data } = await axios.get(Link);

      dispatch({ type: LOAD_JOBS_SUCCESS, payload: data.jobs });
   } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        // console.log("Error", axiosError);
        // Response Failure
        dispatch({ type: LOAD_JOBS_FAIL, payload: (axiosError.response?.data as any)?.message });
      }
   }
};

// filter Jobs By Department
export const filterJobsByDepartment = (keyword: string) => async (dispatch: any) => {
   try {
      // Dispatch request
      dispatch({ type: LOAD_JOBS_REQUEST });

      let Link = BASE_URL + `/jobs`;
      if (keyword) Link += `?department=${keyword}`;

      // Requesting  Data from db
      const { data } = await axios.get(Link);

      dispatch({ type: LOAD_JOBS_SUCCESS, payload: data.jobs });
   } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        // console.log("Error", axiosError);
        // Response Failure
        dispatch({ type: LOAD_JOBS_FAIL, payload: (axiosError.response?.data as any)?.message });
      }
   }
};

// filter Jobs By Department
export const filterJobsByExperience = (keyword: string) => async (dispatch: any) => {
   try {
      // Dispatch request
      dispatch({ type: LOAD_JOBS_REQUEST });
      let Link = BASE_URL + `/jobs`;
      if (keyword) {
         Link += `?experience=${keyword}`;
      }
      // Requesting  Data from db
      const { data } = await axios.get(Link);

      dispatch({ type: LOAD_JOBS_SUCCESS, payload: data.jobs });
   } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        // console.log("Error", axiosError);
        // Response Failure
        dispatch({ type: LOAD_JOBS_FAIL, payload: (axiosError.response?.data as any)?.message });
      }
   }
};

// filter Jobs By Department
export const filterJobsBySalary = (keyword: string) => async (dispatch: any) => {
   try {
      // Dispatch request
      dispatch({ type: LOAD_JOBS_REQUEST });
      let Link = BASE_URL + `/jobs`;
      if (keyword) {
         Link += `?salary=${keyword}`;
      }
      // Requesting  Data from db
      const { data } = await axios.get(Link);

      dispatch({ type: LOAD_JOBS_SUCCESS, payload: data.jobs });
   } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        // console.log("Error", axiosError);
        // Response Failure
        dispatch({ type: LOAD_JOBS_FAIL, payload: (axiosError.response?.data as any)?.message });
      }
   }
};

// filter Jobs By Department
export const filterJobsByCompanyName = (keyword: string) => async (dispatch: any) => {
   try {
      // Dispatch request
      dispatch({ type: LOAD_JOBS_REQUEST });
      let Link = BASE_URL + `/jobs`;
      if (keyword) {
         Link += `?company_name=${keyword}`;
      }
      // Requesting  Data from db
      const { data } = await axios.get(Link);

      dispatch({ type: LOAD_JOBS_SUCCESS, payload: data.jobs });
   } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        // console.log("Error", axiosError);
        // Response Failure
        dispatch({ type: LOAD_JOBS_FAIL, payload: (axiosError.response?.data as any)?.message });
      }
   }
};
// filter Jobs By Department
export const filterJobsByRequirement = (keyword: string) => async (dispatch: any) => {
   try {
      // Dispatch request
      dispatch({ type: LOAD_JOBS_REQUEST });
      let Link = BASE_URL + `/jobs`;
      if (keyword) {
         Link += `?requirement=${keyword}`;
      }
      // Requesting  Data from db
      const { data } = await axios.get(Link);

      dispatch({ type: LOAD_JOBS_SUCCESS, payload: data.jobs });
   } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        // console.log("Error", axiosError);
        // Response Failure
        dispatch({ type: LOAD_JOBS_FAIL, payload: (axiosError.response?.data as any)?.message });
      }
   }
};

// Get job details
export const jobDetailsById = (jobId: string) => async (dispatch: any) => {
   try {
      // Dispatch request
      dispatch({ type: JOB_REQUEST });


      // Requesting to Backend
      // Requesting  Data
      const { data } = await axios.get(BASE_URL + `/job/${jobId}`);

      dispatch({ type: JOB_SUCCESS, payload: data.job });
   } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.log("Error", axiosError);
        // Response Failure
        dispatch({ type: JOB_FAIL, payload: (axiosError.response?.data as any)?.message });
      }
   }
};

// applied job 
export const applyToJob = (job_id: string) =>
   async (dispatch: any) => {
      try {
         // Dispatch request
         dispatch({ type: APPLY_JOB_REQUEST });

         const { data } = await axios.post(BASE_URL + `/apply/job`, { job_id: job_id });

         dispatch({ type: APPLY_JOB_SUCCESS, payload: data });
      } catch (error) {
         if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            console.log("Error", axiosError);
            // Response Failure
            dispatch({ type: APPLY_JOB_FAIL, payload: (axiosError.response?.data as any)?.message });
          }
      }
   };

// DELETE applied job 
export const deleteMyApplication = (job_id: string) => async (dispatch: any) => {
   try {
      // Dispatch request
      dispatch({ type: DELETE_JOB_APPLICATIONS_REQUEST });


      // Requesting to Backend
      // Requesting  Data
      const { data } = await axios.delete(BASE_URL + `/delete/myJob/application/${job_id}`);

      dispatch({ type: DELETE_JOB_APPLICATIONS_SUCCESS, payload: data });
   } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.log("Error", axiosError);
        // Response Failure
        dispatch({ type: DELETE_JOB_APPLICATIONS_FAIL, payload: (axiosError.response?.data as any)?.message });
      }
   }
};

// DELETE  job 
export const deleteJob = (jobId: string) => async (dispatch: any) => {
   try {
      // Dispatch request
      dispatch({ type: DELETE_JOB_REQUEST });

      if (!jobId) return;
      let Link = BASE_URL + `/company/delete/job/${jobId}`

      // Requesting  Data
      const { data } = await axios.delete(Link);

      dispatch({ type: DELETE_JOB_SUCCESS, payload: data.message });
   } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.log("Error", axiosError);
        // Response Failure
        dispatch({ type: DELETE_JOB_FAIL, payload: (axiosError.response?.data as any)?.message });
      }
   }
};