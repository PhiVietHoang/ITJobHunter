import {
    GET_STUDENT_REQUEST,
    GET_STUDENT_SUCCESS,
    GET_STUDENT_FAIL,
    GET_ALL_STUDENTS_REQUEST,
    GET_ALL_STUDENTS_SUCCESS,
    GET_ALL_STUDENTS_FAIL,
    CLEAR_ERRORS
 } from "../Constants/studentProfileConstants.js";
 import axios, { AxiosError }from "axios";
 const BASE_URL = "https://crm-backend-system-employee-hiring.onrender.com/api/v1";
 
 
 // Clearing Errors
 export const clearErrors = () => async (dispatch: any) => {
    dispatch({ type: CLEAR_ERRORS });
 };
 
 // get Student Info
 export const getStudentInfo = (student_id: string) => async (dispatch: any) => {
    try {
       // Dispatch request
       dispatch({ type: GET_STUDENT_REQUEST });
 
       // Requesting  Data from db
       const { data } = await axios.get(BASE_URL + `/student/details/${student_id}`,);
       dispatch({ type: GET_STUDENT_SUCCESS, payload: data.student });
    } catch (error) {
       if (axios.isAxiosError(error)) {
         const axiosError = error as AxiosError;
         console.log("Error", axiosError);
         // Response Failure
         dispatch({ type: GET_STUDENT_FAIL, payload: (axiosError.response?.data as any)?.message });
       }
    }
 };
 
 // get Students
 export const getAllStudents = () => async (dispatch: any) => {
    try {
       // Dispatch request
       dispatch({ type: GET_ALL_STUDENTS_REQUEST });
 
       // Requesting  Data from db
       const { data } = await axios.get(BASE_URL + `/admin/students`,);
       dispatch({ type: GET_ALL_STUDENTS_SUCCESS, payload: data.students });
    } catch (error) {
       if (axios.isAxiosError(error)) {
         const axiosError = error as AxiosError;
         console.log("Error", axiosError);
         // Response Failure
         dispatch({ type: GET_ALL_STUDENTS_FAIL, payload: (axiosError.response?.data as any)?.message });
       }
    }
 };