// reducer.js
import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import {
   GET_STUDENT_REQUEST,
   GET_STUDENT_SUCCESS,
   GET_STUDENT_FAIL,
   CLEAR_ERRORS
} from "../Constants/studentProfileConstants.js";


const initialState = {
   student: null as any,
   studentProfileLoading: false,
   error: null
 };
 
export const studentProfileReducer = createReducer(initialState, (builder) => {
   builder
      .addCase(GET_STUDENT_REQUEST, (state) => {
         state.studentProfileLoading = true;
      })
      .addCase(GET_STUDENT_SUCCESS, (state, action) => {
         state.studentProfileLoading = false;
         state.student = (action as PayloadAction<any>).payload;
         state.error = null;
      })
      .addCase(GET_STUDENT_FAIL, (state, action) => {
         state.studentProfileLoading = false;
         state.student = null;
         state.error = (action as PayloadAction<any>).payload;
      })
      .addCase(CLEAR_ERRORS, (state) => {
         state.error = null;
      });
});



