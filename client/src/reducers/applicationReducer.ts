import { createReducer, PayloadAction } from "@reduxjs/toolkit";

import {
   JOB_APPLICATION_REQUEST,
   JOB_APPLICATION_SUCCESS,
   JOB_APPLICATION_FAIL,
   UPDATE_JOB_APPLICATIONS_REQUEST,
   UPDATE_JOB_APPLICATIONS_SUCCESS,
   UPDATE_JOB_APPLICATIONS_FAIL,
   DELETE_JOB_APPLICATIONS_ID_REQUEST,
   DELETE_JOB_APPLICATIONS_ID_SUCCESS,
   DELETE_JOB_APPLICATIONS_ID_FAIL,
   CLEAR_ERRORS,
} from "../Constants/JobApplicationConstants";

// Define an interface for the state
interface ApplicationState {
   application: any;
   jobApplicationLoading?: boolean;
   error?: any;
  }

// Initial State
const initialState: ApplicationState = { application: {} };

// Reducers
export const applicationReducer = createReducer(initialState, (builder) => {
   builder
      .addCase(DELETE_JOB_APPLICATIONS_ID_REQUEST, (state) => {
         state.jobApplicationLoading = true;
      })
      .addCase(DELETE_JOB_APPLICATIONS_ID_SUCCESS, (state, action) => {
         state.jobApplicationLoading = false;
         state.application = (action as PayloadAction<any>).payload;
      })
      .addCase(DELETE_JOB_APPLICATIONS_ID_FAIL, (state, action) => {
         state.jobApplicationLoading = false;
         state.error = (action as PayloadAction<any>).payload;
      })
      .addCase(UPDATE_JOB_APPLICATIONS_REQUEST, (state) => {
         state.jobApplicationLoading = true;
      })
      .addCase(UPDATE_JOB_APPLICATIONS_SUCCESS, (state, action) => {
         state.jobApplicationLoading = false;
         state.application = (action as PayloadAction<any>).payload;
      })
      .addCase(UPDATE_JOB_APPLICATIONS_FAIL, (state, action) => {
         state.jobApplicationLoading = false;
         state.error = (action as PayloadAction<any>).payload;
      })
      .addCase(JOB_APPLICATION_REQUEST, (state) => {
         state.jobApplicationLoading = true;
      })
      .addCase(JOB_APPLICATION_SUCCESS, (state, action) => {
         state.jobApplicationLoading = false;
         state.application = (action as PayloadAction<any>).payload;
      })
      .addCase(JOB_APPLICATION_FAIL, (state, action) => {
         state.jobApplicationLoading = false;
         state.error = (action as PayloadAction<any>).payload;
      })
      .addCase(CLEAR_ERRORS, (state) => {
         state.error = null;
      });
})