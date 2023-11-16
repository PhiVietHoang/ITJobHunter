

import {
    LOAD_COMPANY_REQUEST,
    LOAD_COMPANY_SUCCESS,
    LOAD_COMPANY_FAIL,
    GET_COMPANY_DETAILS_REQUEST,
    GET_COMPANY_DETAILS_SUCCESS,
    GET_COMPANY_DETAILS_FAIL,
    UPDATE_COMPANY_REQUEST,
    UPDATE_COMPANY_SUCCESS,
    UPDATE_COMPANY_FAIL,
    CLEAR_ERRORS,
 } from "../Constants/CompanyConstants";
 import { createReducer, PayloadAction } from "@reduxjs/toolkit";
 
 // Initial State
 const initialState = {
    company: {},
    companyLoading: true,
    error: null
 };
 
 // Reducers
 export const companyReducer = createReducer(initialState, (builder) => {
    builder
       .addCase(UPDATE_COMPANY_REQUEST, (state) => {
          state.companyLoading = true;
       })
       .addCase(UPDATE_COMPANY_SUCCESS, (state, action) => {
          state.companyLoading = false;
          state.company = (action as PayloadAction<any>).payload;
       })
       .addCase(UPDATE_COMPANY_FAIL, (state, action) => {
          state.companyLoading = false;
          state.error = (action as PayloadAction<any>).payload;
       })
       .addCase(GET_COMPANY_DETAILS_REQUEST, (state) => {
          state.companyLoading = true;
       })
       .addCase(GET_COMPANY_DETAILS_SUCCESS, (state, action) => {
          state.companyLoading = false;
          state.company = (action as PayloadAction<any>).payload;
       })
       .addCase(GET_COMPANY_DETAILS_FAIL, (state, action) => {
          state.companyLoading = false;
          state.error = (action as PayloadAction<any>).payload;
       })
       .addCase(CLEAR_ERRORS, (state) => {
          state.error = null;
       });
 })