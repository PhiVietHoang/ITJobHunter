import { createReducer, PayloadAction } from "@reduxjs/toolkit";

import {
   JOB_REQUEST,
   JOB_SUCCESS,
   JOB_FAIL,
   CREATE_JOB_REQUEST,
   CREATE_JOB_SUCCESS,
   CREATE_JOB_FAIL,
   LOAD_JOB_REQUEST,
   LOAD_JOB_SUCCESS,
   LOAD_JOB_FAIL,
   UPDATE_JOB_REQUEST,
   UPDATE_JOB_SUCCESS,
   UPDATE_JOB_FAIL,
   APPLY_JOB_REQUEST,
   APPLY_JOB_SUCCESS,
   APPLY_JOB_FAIL,
   DELETE_JOB_REQUEST,
   DELETE_JOB_SUCCESS,
   DELETE_JOB_FAIL,
   CLEAR_ERRORS,
} from "../Constants/JobConstants";

// Initial State
const initialState = { 
   job: null,
   jobLoading: true,
   editJob: false,
   jobsError: null
  };

// Reducers
export const editJobReducer = createReducer(initialState, (builder) => {
   builder
      .addCase("EDIT_JOB_REQUEST", (state) => {
         state.editJob = true;
      })
      .addCase("EDIT_JOB_SUCCESS", (state) => {
         state.editJob = false;
      })
})


export const jobReducer = createReducer(initialState, (builder) => {
   builder
      .addCase(UPDATE_JOB_REQUEST, (state) => {
         state.jobLoading = true;
      })
      .addCase(UPDATE_JOB_SUCCESS, (state, action) => {
         state.jobLoading = false;
         state.job = (action as PayloadAction<any>).payload;
      })
      .addCase(UPDATE_JOB_FAIL, (state, action) => {
         state.jobLoading = false;
         state.job = null;
         state.jobsError = (action as PayloadAction<any>).payload;
      })
      .addCase(CREATE_JOB_REQUEST, (state) => {
         state.jobLoading = true;
      })
      .addCase(CREATE_JOB_SUCCESS, (state, action) => {
         state.jobLoading = false;
         state.job = (action as PayloadAction<any>).payload;
      })
      .addCase(CREATE_JOB_FAIL, (state, action) => {
         state.jobLoading = false;
         state.job = null;
         state.jobsError = (action as PayloadAction<any>).payload;
      })
      .addCase(JOB_REQUEST, (state) => {
         state.jobLoading = true;
      })
      .addCase(JOB_SUCCESS, (state, action) => {
         state.jobLoading = false;
         state.job = (action as PayloadAction<any>).payload;
      })
      .addCase(JOB_FAIL, (state, action) => {
         state.jobLoading = false;
         state.jobsError = (action as PayloadAction<any>).payload;
      })
      .addCase(APPLY_JOB_REQUEST, (state) => {
         state.jobLoading = true;
      })
      .addCase(APPLY_JOB_SUCCESS, (state, action) => {
         state.jobLoading = false;
         state.job = (action as PayloadAction<any>).payload;
      })
      .addCase(APPLY_JOB_FAIL, (state, action) => {
         state.jobLoading = false;
         state.jobsError = (action as PayloadAction<any>).payload;
      })
      .addCase(DELETE_JOB_REQUEST, (state) => {
         state.jobLoading = true;
      })
      .addCase(DELETE_JOB_SUCCESS, (state, action) => {
         state.jobLoading = false;
         state.job = (action as PayloadAction<any>).payload;
      })
      .addCase(DELETE_JOB_FAIL, (state, action) => {
         state.jobLoading = false;
         state.jobsError = (action as PayloadAction<any>).payload;
      })
      .addCase(CLEAR_ERRORS, (state) => {
         state.jobsError = null;
      });
})