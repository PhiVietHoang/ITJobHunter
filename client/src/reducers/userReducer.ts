import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import {
   LOGIN_REQUEST,
   LOGIN_FAIL,
   LOGIN_SUCCESS,
   REGISTER_USER_REQUEST,
   REGISTER_USER_SUCCESS,
   REGISTER_USER_FAIL,
   LOAD_USER_REQUEST,
   LOAD_USER_SUCCESS,
   LOAD_USER_FAIL,
   LOGOUT_REQUEST,
   LOGOUT_SUCCESS,
   UPDATE_USER_REQUEST,
   UPDATE_USER_SUCCESS,
   UPDATE_USER_FAIL,
   LOAD_ALL_STUDENTS_USER_REQUEST,
   LOAD_ALL_STUDENTS_USER_SUCCESS,
   LOAD_ALL_STUDENTS_USER_FAIL,
   DELETE_USER_REQUEST,
   DELETE_USER_SUCCESS,
   DELETE_USER_FAIL,
   LOAD_ALL_ENGINEER_REQUEST,
   LOAD_ALL_ENGINEER_SUCCESS,
   GET_ENGINEER_REQUEST,
   GET_ENGINEER_SUCCESS,
   GET_ENGINEER_FAIL,
   LOAD_ALL_ENGINEER_FAIL,
   DELETE_ENGINEER_REQUEST,
   DELETE_ENGINEER_SUCCESS,
   DELETE_ENGINEER_FAIL,
   CLEAR_ERRORS
} from "../Constants/UserConstants";

// Initial State
const initialState = {
   user: null as any,
   loading: false,
   isAuthenticated: false,
   error: null
};

// Reducers
export const userReducer = createReducer(initialState, (builder) => {
   builder
      .addCase(LOGIN_REQUEST, (state) => {
         state.loading = true;
         state.isAuthenticated = false;
      })
      .addCase(LOGOUT_REQUEST, (state) => {
         state.loading = true;
      })
      .addCase(UPDATE_USER_REQUEST, (state) => {
         state.loading = true;
         state.error = null;
      })
      .addCase(LOAD_USER_REQUEST, (state) => {
         state.loading = true;
         state.isAuthenticated = false;
      })
      .addCase(REGISTER_USER_REQUEST, (state) => {
         state.loading = true;
         state.isAuthenticated = false;
      });
   builder
      .addCase(LOGIN_SUCCESS, (state, action) => {
         state.loading = false;
         state.isAuthenticated = true;
         state.user = (action as PayloadAction<any>).payload;
         state.error = null;
      })
      .addCase(LOGOUT_SUCCESS, (state) => {
         state.loading = false;
         state.isAuthenticated = false;
         state.user = null;
         state.error = null;
      })
      .addCase(UPDATE_USER_SUCCESS, (state, action) => {
         state.loading = false;
         state.isAuthenticated = true;
         state.user = (action as PayloadAction<any>).payload;
         state.error = null;
      })
      .addCase(LOAD_USER_SUCCESS, (state, action) => {
         state.loading = false;
         state.isAuthenticated = true;
         state.user = (action as PayloadAction<any>).payload;
         state.error = null;
      })
      .addCase(REGISTER_USER_SUCCESS, (state, action) => {
         state.loading = false;
         state.isAuthenticated = true;
         state.user = (action as PayloadAction<any>).payload;
         state.error = null;
      });
   builder
      .addCase(LOGIN_FAIL, (state, action) => {
         state.loading = false;
         state.isAuthenticated = false;
         state.user = null;
         state.error = (action as PayloadAction<any>).payload;
      })
      .addCase(REGISTER_USER_FAIL, (state, action) => {
         state.loading = false;
         state.isAuthenticated = false;
         state.user = null;
         state.error = (action as PayloadAction<any>).payload;
      })
      .addCase(UPDATE_USER_FAIL, (state, action) => {
         state.loading = false;
         state.isAuthenticated = false;
         state.user = null;
         state.error = (action as PayloadAction<any>).payload;
      })
      .addCase(LOAD_USER_FAIL, (state, action) => {
         state.loading = false;
         state.isAuthenticated = false;
         state.user = null;
         state.error = (action as PayloadAction<any>).payload;
      });
   builder
      .addCase(CLEAR_ERRORS, (state) => {
         state.error = null;
      });
});
export const usersReducer = createReducer({
   users: null as any,
   usersLoading: false,
   error: null
}, (builder) => {
   builder
      .addCase(LOAD_ALL_STUDENTS_USER_REQUEST, (state) => {
         state.usersLoading = true;
      })
      .addCase(LOAD_ALL_STUDENTS_USER_SUCCESS, (state, action) => {
         state.usersLoading = false;
         state.users = (action as PayloadAction<any>).payload;
         state.error = null;
      })
      .addCase(LOAD_ALL_STUDENTS_USER_FAIL, (state, action) => {
         state.usersLoading = false;
         state.users = null;
         state.error = (action as PayloadAction<any>).payload;
      })
      .addCase(DELETE_USER_REQUEST, (state) => {
         state.usersLoading = true;
      })
      .addCase(DELETE_USER_SUCCESS, (state, action) => {
         state.usersLoading = false;
         state.users = (action as PayloadAction<any>).payload;
         state.error = null;
      })
      .addCase(DELETE_USER_FAIL, (state, action) => {
         state.usersLoading = false;
         state.users = null;
         state.error = (action as PayloadAction<any>).payload;
      })
   builder
      .addCase(CLEAR_ERRORS, (state) => {
         state.error = null;
      });
});
export const engineersReducer = createReducer({
   engineers: null as any,
   engineersLoading: false,
   error: null
}, (builder) => {
   builder
      .addCase(LOAD_ALL_ENGINEER_REQUEST, (state) => {
         state.engineersLoading = true;
      })
      .addCase(LOAD_ALL_ENGINEER_SUCCESS, (state, action) => {
         state.engineersLoading = false;
         state.engineers = (action as PayloadAction<any>).payload;
         state.error = null;
      })
      .addCase(LOAD_ALL_ENGINEER_FAIL, (state, action) => {
         state.engineersLoading = false;
         state.engineers = null;
         state.error = (action as PayloadAction<any>).payload;
      }).addCase(DELETE_ENGINEER_REQUEST, (state) => {
         state.engineersLoading = true;
      })
      .addCase(DELETE_ENGINEER_SUCCESS, (state, action) => {
         state.engineersLoading = false;
         state.error = null;
      })
      .addCase(DELETE_ENGINEER_FAIL, (state, action) => {
         state.engineersLoading = false;
         state.error = (action as PayloadAction<any>).payload;
      })
   builder
      .addCase(CLEAR_ERRORS, (state) => {
         state.error = null;
      });
});
export const engineerReducer = createReducer({
   engineer: {},
   engineerLoading: false,
   error: null
}, (builder) => {
   builder
      .addCase(UPDATE_USER_REQUEST, (state) => {
         state.engineerLoading = true;
      })
      .addCase(UPDATE_USER_SUCCESS, (state, action) => {
         state.engineerLoading = false;
         state.error = null;
      })
      .addCase(UPDATE_USER_FAIL, (state, action) => {
         state.engineerLoading = false;
         state.error = (action as PayloadAction<any>).payload;
      })
   builder
      .addCase(CLEAR_ERRORS, (state) => {
         state.error = null;
      });
});
