import { createReducer, PayloadAction } from "@reduxjs/toolkit";

import {
   LOAD_JOB_APPLICATIONS_REQUEST,
   LOAD_JOB_APPLICATIONS_SUCCESS,
   LOAD_JOB_APPLICATIONS_FAIL,
   JOB_APPLICATIONS_REQUEST,
   JOB_APPLICATIONS_SUCCESS,
   JOB_APPLICATIONS_FAIL,
   GET_JOB_APPLICATIONS_BY_COMPANY_NAME_REQUEST,
   GET_JOB_APPLICATIONS_BY_COMPANY_NAME_SUCCESS,
   GET_JOB_APPLICATIONS_BY_COMPANY_NAME_FAIL,
   CLEAR_ERRORS,
} from "../Constants/JobApplicationConstants";

// Define an interface for the state
interface ApplicationsState {
   applications: any;
   jobApplicationsLoading?: boolean;
   error?: any;
 }
 
// Initial State
const initialState: ApplicationsState = { applications: {} };

// Reducers
export const applicationsReducer = createReducer(initialState, (builder) => {
   builder
      .addCase(JOB_APPLICATIONS_REQUEST, (state) => {
         state.jobApplicationsLoading = true;
      })
      .addCase(JOB_APPLICATIONS_SUCCESS, (state, action) => {
         state.jobApplicationsLoading = false;
         state.applications = (action as PayloadAction<any>).payload;
      })
      .addCase(JOB_APPLICATIONS_FAIL, (state, action) => {
         state.jobApplicationsLoading = false;
         state.error = (action as PayloadAction<any>).payload;
      })
      .addCase(LOAD_JOB_APPLICATIONS_REQUEST, (state) => {
         state.jobApplicationsLoading = true;
      })
      .addCase(LOAD_JOB_APPLICATIONS_SUCCESS, (state, action) => {
         state.jobApplicationsLoading = false;
         state.applications = (action as PayloadAction<any>).payload;
      })
      .addCase(LOAD_JOB_APPLICATIONS_FAIL, (state, action) => {
         state.jobApplicationsLoading = false;
         state.error = (action as PayloadAction<any>).payload;
      })
      .addCase(GET_JOB_APPLICATIONS_BY_COMPANY_NAME_REQUEST, (state) => {
         state.jobApplicationsLoading = true;
      })
      .addCase(GET_JOB_APPLICATIONS_BY_COMPANY_NAME_SUCCESS, (state, action) => {
         state.jobApplicationsLoading = false;
         state.applications = (action as PayloadAction<any>).payload;
      })
      .addCase(GET_JOB_APPLICATIONS_BY_COMPANY_NAME_FAIL, (state, action) => {
         state.jobApplicationsLoading = false;
         state.error = (action as PayloadAction<any>).payload;
      })
      .addCase(CLEAR_ERRORS, (state) => {
         state.error = null;
      });
})