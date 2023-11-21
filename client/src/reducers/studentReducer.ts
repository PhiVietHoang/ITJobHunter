// reducer.ts
import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import {
   GET_ALL_STUDENTS_REQUEST,
   GET_ALL_STUDENTS_SUCCESS,
   GET_ALL_STUDENTS_FAIL,
   CLEAR_ERRORS
} from "../Constants/studentProfileConstants.js";


const initialState = {
   students: null as any,
   studentsLoading: false,
   error: null
};

export const studentsReducer = createReducer(initialState, (builder) => {
   builder
      .addCase(GET_ALL_STUDENTS_REQUEST, (state) => {
         state.studentsLoading = true;
         state.students = null;
      })
      .addCase(GET_ALL_STUDENTS_SUCCESS, (state, action) => {
         state.studentsLoading = false;
         state.students = (action as PayloadAction<any>).payload;
         state.error = null;
      })
      .addCase(GET_ALL_STUDENTS_FAIL, (state, action) => {
         state.studentsLoading = false;
         state.students = null;
         state.error = (action as PayloadAction<any>).payload;
      })
      .addCase(CLEAR_ERRORS, (state) => {
         state.error = null;
      });
});



