import {
    LOAD_COMPANIES_REQUEST,
    LOAD_COMPANIES_SUCCESS,
    LOAD_COMPANIES_FAIL,
    FILTER_COMPANIES_REQUEST,
    FILTER_COMPANIES_SUCCESS,
    FILTER_COMPANIES_FAIL,
    GET_COMPANIES_DETAILS_REQUEST,
    GET_COMPANIES_DETAILS_SUCCESS,
    GET_COMPANIES_DETAILS_FAIL,
    CLEAR_ERRORS,
 } from "../Constants/CompanyConstants";
 import { createReducer, PayloadAction } from "@reduxjs/toolkit";
 
 // Define an interface for the state
 interface CompaniesState {
   companies: any;
   companiesLoading?: boolean;
   error?: any;
  }
  
  // Initial State
  const initialState: CompaniesState = { companies: {} };
 
 // Reducers
 export const companiesReducer = createReducer(initialState, (builder) => {
    builder
       .addCase(GET_COMPANIES_DETAILS_REQUEST, (state) => {
          state.companiesLoading = true;
       })
       .addCase(GET_COMPANIES_DETAILS_SUCCESS, (state, action) => {
          state.companiesLoading = false;
          state.companies = (action as PayloadAction<any>).payload;
       })
       .addCase(GET_COMPANIES_DETAILS_FAIL, (state, action) => {
          state.companiesLoading = false;
          state.error = (action as PayloadAction<any>).payload;
       })
       .addCase(LOAD_COMPANIES_REQUEST, (state) => {
          state.companiesLoading = true;
       })
       .addCase(LOAD_COMPANIES_SUCCESS, (state, action) => {
          state.companiesLoading = false;
          state.companies = (action as PayloadAction<any>).payload;
       })
       .addCase(LOAD_COMPANIES_FAIL, (state, action) => {
          state.companiesLoading = false;
          state.error = (action as PayloadAction<any>).payload;
       })
       .addCase(FILTER_COMPANIES_REQUEST, (state) => {
          state.companiesLoading = true;
       })
       .addCase(FILTER_COMPANIES_SUCCESS, (state, action) => {
          state.companiesLoading = false;
          state.companies = (action as PayloadAction<any>).payload;
       })
       .addCase(FILTER_COMPANIES_FAIL, (state, action) => {
          state.companiesLoading = false;
          state.error = (action as PayloadAction<any>).payload;
       })
       .addCase(CLEAR_ERRORS, (state) => {
          state.error = null;
       });
 })