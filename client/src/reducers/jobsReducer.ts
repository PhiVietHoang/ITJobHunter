import { createReducer, PayloadAction } from "@reduxjs/toolkit";

import {
   LOAD_JOBS_REQUEST,
   LOAD_JOBS_SUCCESS,
   LOAD_JOBS_FAIL,
   GET_JOBS_REQUEST,
   GET_JOBS_SUCCESS,
   GET_JOBS_FAIL,
   CLEAR_ERRORS,
} from "../Constants/JobConstants";

// Initial State
const initialState = { 
   jobs: {},
   jobsLoading: false,
   error: null
  };

// Reducers
export const jobsReducer = createReducer(initialState, (builder) => {
   builder
      .addCase(GET_JOBS_REQUEST, (state) => {
         state.jobsLoading = true;
      })
      .addCase(GET_JOBS_SUCCESS, (state, action) => {
         state.jobsLoading = false;
         state.jobs = (action as PayloadAction<any>).payload;
      })
      .addCase(GET_JOBS_FAIL, (state, action) => {
         state.jobsLoading = false;
         state.error = (action as PayloadAction<any>).payload;
      })
      .addCase(LOAD_JOBS_REQUEST, (state) => {
         state.jobsLoading = true;
      })
      .addCase(LOAD_JOBS_SUCCESS, (state, action) => {
         state.jobsLoading = false;
         state.jobs = (action as PayloadAction<any>).payload;
      })
      .addCase(LOAD_JOBS_FAIL, (state, action) => {
         state.jobsLoading = false;
         state.error = (action as PayloadAction<any>).payload;
      })
      .addCase(CLEAR_ERRORS, (state) => {
         state.error = null;
      });
})